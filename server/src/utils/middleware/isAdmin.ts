import { verify } from "jsonwebtoken";
import { MyContext, MyContextPayload } from "../../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    throw new Error("MISSING TOKEN");
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = verify(token, process.env.SECRET_JWT);
    context.payload = payload as MyContextPayload | undefined;
  } catch (err) {
    throw new Error("MISSING TOKEN");
  }
  if (!context.payload?.admin) {
    throw new Error("MISSING TOKEN");
  }
  return next();
};
