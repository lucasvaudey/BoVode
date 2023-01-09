import { Post } from "../model/social/Post";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { prisma } from "../prisma/client";
import { User } from "../model/User";
import { mapUserDbToUser } from "../mappers/user/user_mappers";
import { isAdmin } from "../utils/middleware/isAdmin";
import { isAuth } from "../utils/middleware/isAuth";
import { MyContext } from "../types/MyContext";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg("pageNumber", () => Number) pageNumber: number,
    @Arg("numberPerPage", () => Number) numberPerPage: number
  ): Promise<Post[]> {
    const posts = await prisma.postDb.findMany({
      take: numberPerPage,
      skip: pageNumber * numberPerPage,
    });
    return posts.map((e) => new Post(e));
  }

  @FieldResolver(() => User)
  async author(@Root() post: Post): Promise<User> {
    const user = await prisma.userDb.findUniqueOrThrow({
      where: {
        id: (
          await prisma.postDb.findUnique({ where: { id: post.id } })
        )?.userId,
      },
    });
    return mapUserDbToUser(user);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth, isAdmin)
  async createPost(
    @Ctx() context: MyContext,
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string
  ): Promise<Post> {
    const post = await prisma.postDb.create({
      data: {
        content: content,
        title: title,
        userId: context.payload!.userId,
      },
    });
    return new Post(post);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isAdmin)
  async deletePost(@Arg("id", () => Number) id: number): Promise<boolean> {
    await prisma.postDb.delete({ where: { id: id } });
    return true;
  }
}
