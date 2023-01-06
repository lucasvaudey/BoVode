import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { MyContext } from "../types/MyContext";
import {
  createAccessToken,
  createRefreshToken,
  isAuth,
} from "../utils/middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../model/User";
import CryptoJS from "crypto-js";
import { CustomError } from "../model/objectType/CustomError";
import { BoolResponse } from "../model/objectType/BoolResponse";
import { UserInput } from "../model/inputs/UserInput";
import { prisma } from "../prisma/client";
import { mapUserDbToUser } from "../mappers/user/user_mappers";
import { isAdmin } from "../utils/middleware/isAdmin";

@ObjectType()
class Token {
  @Field(() => String)
  access: string;
  @Field(() => String)
  refresh: string;
}

@ObjectType()
class ConnectionResponse {
  @Field(() => Token, { nullable: true })
  token: Token | null;
  @Field(() => CustomError, { nullable: true })
  error: CustomError | null;
}

export interface TokenRefreshData {
  userId: number;
  jid: string;
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    const user = await prisma.userDb.findUnique({
      where: { id: payload?.userId },
    });
    if (!user) {
      return null;
    }
    return mapUserDbToUser(user);
  }

  @Mutation(() => ConnectionResponse)
  @UseMiddleware(isAuth, isAdmin)
  async changePassword(
    @Ctx() { payload }: MyContext,
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPerssword") newPassword: string
  ): Promise<ConnectionResponse> {
    if (oldPassword.length < 5) {
      return {
        error: {
          label: "changePwd",
          message: "old password not valid",
        },
        token: null,
      };
    }
    if (newPassword.length < 5) {
      return {
        error: {
          label: "changePwd",
          message: "new password too short",
        },
        token: null,
      };
    }
    const user = await prisma.userDb.findUnique({
      where: { id: payload?.userId },
    });
    if (!user) {
      return {
        error: {
          label: "changePwd",
          message: "cannot find user",
        },
        token: null,
      };
    }
    const oldPasswordValid = await compare(oldPassword, user.password);
    if (!oldPasswordValid) {
      return {
        error: {
          label: "changePwd",
          message: "Old password not valid",
        },
        token: null,
      };
    }
    await prisma.userDb.update({
      where: { id: user.id },
      data: { password: await hash(newPassword, 10) },
    });
    //succesfuly update the password
    return {
      error: null,
      token: {
        access: createAccessToken(user.id, user.admin),
        refresh: createRefreshToken(user.id, user.password),
      },
    };
  }

  @Mutation(() => ConnectionResponse)
  async refreshToken(@Arg("token") token: string): Promise<ConnectionResponse> {
    const payload = verify(
      token,
      process.env.SECRET_REFRESH
    ) as TokenRefreshData;
    if (!payload) {
      return {
        error: {
          label: "refreshToken",
          message: "INVALID_TOKEN",
        },
        token: null,
      };
    }

    const userId = payload.userId;
    const user = await prisma.userDb.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        error: {
          label: "refreshToken",
          message: "INVALID_TOKEN",
        },
        token: null,
      };
    }
    const actualPass = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(user.password, process.env.SECRET_JID)
    );
    if (payload.jid == actualPass) {
      return {
        token: {
          access: createAccessToken(user.id, user.admin),
          refresh: createRefreshToken(user.id, user.password),
        },
        error: null,
      };
    }
    return {
      token: null,
      error: {
        label: "refreshToken",
        message: "PASSWORD_HAS_CHANGED",
      },
    };
  }

  @Mutation(() => ConnectionResponse)
  async connect(
    @Arg("emailOrUsername") emailOrPseudo: string,
    @Arg("password") password: string
  ): Promise<ConnectionResponse> {
    const userEmail = await prisma.userDb.findUnique({
      where: { email: emailOrPseudo.toLowerCase() },
    });
    let user = userEmail;
    if (!userEmail) {
      const userPseudo = await prisma.userDb.findUnique({
        where: { pseudo: emailOrPseudo },
      });
      user = userPseudo;
      if (!userPseudo) {
        return {
          error: {
            label: "connection",
            message: "Cannot connect user",
          },
          token: null,
        };
      }
    }
    if (!user) {
      return {
        error: {
          label: "connection",
          message: "Cannot connect user",
        },
        token: null,
      };
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      return {
        error: {
          label: "connection",
          message: "Cannot connect user",
        },
        token: null,
      };
    }
    // login successful

    return {
      token: {
        access: createAccessToken(user.id, user.admin),
        refresh: createRefreshToken(user.id, user.password),
      },
      error: null,
    };
  }

  @Mutation(() => ConnectionResponse)
  async register(
    @Arg("email") email: string,
    @Arg("pseudo") pseudo: string,
    @Arg("password") password: string
  ): Promise<ConnectionResponse> {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.userDb.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (user) {
      return {
        error: {
          label: "register",
          message: "email already exists",
        },
        token: null,
      };
    }
    if (email.length < 3) {
      return {
        error: {
          label: "register",
          message: "email not valid",
        },
        token: null,
      };
    }
    if (password.length < 5) {
      return {
        error: {
          label: "register",
          message: "password too short",
        },
        token: null,
      };
    }
    if (!email.includes("@") || !email.includes(".")) {
      return {
        error: {
          label: "register",
          message: "email not valid",
        },
        token: null,
      };
    }
    if (pseudo.includes(" ") || pseudo.length < 3 || pseudo.length > 15) {
      return {
        error: {
          label: "register",
          message: "pseudo invalid",
        },
        token: null,
      };
    }

    const userPseudo = await prisma.userDb.findUnique({ where: { pseudo } });
    if (userPseudo) {
      return {
        error: {
          label: "register",
          message: "pseudo already exists",
        },
        token: null,
      };
    }
    await prisma.userDb.create({
      data: {
        email: email.toLowerCase(),
        pseudo: pseudo,
        password: hashedPassword,
        admin: pseudo === "lucas" || pseudo === "baptiste",
      },
    });
    const userCreated = await prisma.userDb.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (userCreated) {
      return {
        error: null,
        token: {
          access: createAccessToken(userCreated.id, userCreated.admin),
          refresh: createRefreshToken(userCreated.id, userCreated.password),
        },
      };
    }
    return {
      error: {
        label: "registration",
        message: "error while retreving user",
      },
      token: null,
    };
  }

  @Mutation(() => BoolResponse)
  @UseMiddleware(isAuth, isAdmin)
  async deleteUser(
    @Arg("id", () => ID) userId: number,
    @Ctx() { payload }: MyContext
  ): Promise<BoolResponse> {
    const user = await prisma.userDb.findUnique({
      where: { id: payload?.userId },
    });
    if (!user) {
      return {
        error: {
          label: "user",
          message: "Can't find user",
        },
        success: false,
      };
    }
    if (!user.admin && payload?.userId != userId) {
      return {
        error: {
          label: "Permission",
          message: "You don't have the right to delete the user",
        },
        success: false,
      };
    }
    await prisma.userDb.delete({ where: { id: userId } });
    return { success: true, error: null };
  }

  @Mutation(() => BoolResponse, {
    description: "Update user data, if id null update connected user",
  })
  @UseMiddleware(isAuth, isAdmin)
  async updateUser(
    @Ctx() { payload }: MyContext,
    @Arg("id", () => ID, { nullable: true }) userId: number | null,
    @Arg("input", () => UserInput) input: UserInput
  ): Promise<BoolResponse> {
    const user = await prisma.userDb.findUnique({
      where: { id: payload?.userId },
    });
    if (!user) {
      return {
        error: {
          label: "User",
          message: "User doesn't exist",
        },
        success: false,
      };
    }
    if (userId != null && payload?.userId != userId && !user.admin) {
      return {
        error: {
          label: "User",
          message: "Don't have the right to do that",
        },
        success: false,
      };
    }
    const userModified =
      userId == null
        ? user
        : await prisma.userDb.findUnique({ where: { id: userId } });
    if (!userModified) {
      return {
        error: {
          label: "User",
          message: "User doesn't exist",
        },
        success: false,
      };
    }
    if (input.admin != null && user.admin) {
      userModified.admin = input.admin;
    }
    if (input.email) {
      if (!input.email.includes("@") || !input.email.includes(".")) {
        return {
          error: {
            label: "register",
            message: "email not valid",
          },
          success: false,
        };
      }
      userModified.email = input.email;
    }
    if (input.pseudo) {
      userModified.pseudo = input.pseudo;
    }
    await prisma.userDb.update({
      where: { id: userModified.id },
      data: userModified,
    });
    return { success: true, error: null };
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isAdmin)
  async searchUser(
    @Arg("search", () => String) search: string,
    @Arg("numberByPage", () => Int) numberByPage: number,
    @Arg("pageNumber", () => Int) pageNumber: number
  ): Promise<User[]> {
    const users = await prisma.userDb.findMany({
      where: {
        OR: [
          { pseudo: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      skip: numberByPage * pageNumber,
      take: numberByPage,
    });
    return users;
  }
}
