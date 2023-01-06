import { sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { MyContext, MyContextPayload } from "../../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import CryptoJS from "crypto-js";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    throw new Error("MISSING_TOKEN");
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = verify(token, process.env.SECRET_JWT);
    context.payload = payload as MyContextPayload | undefined;
  } catch (err) {
    throw new Error("TOKEN_EXPIRED");
  }
  return next();
};

export const createAccessToken = (id: number, admin: boolean) => {
  return sign({ userId: id, admin: admin }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRES_IN_TOKEN,
  });
};
export const createRefreshToken = (id: number, password: string) => {
  return sign(
    {
      jid: CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(password, process.env.SECRET_JID)
      ),
      userId: id,
    },
    process.env.SECRET_REFRESH,
    {
      expiresIn: process.env.EXPIRES_IN_TOKEN_REFRESH,
    }
  );
};
