import { Response, Request } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: MyContextPayload | undefined;
}

export interface MyContextPayload {
  userId: number;
  admin: boolean;
  premium: boolean;
}
