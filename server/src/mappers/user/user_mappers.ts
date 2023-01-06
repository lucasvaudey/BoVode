import { UserDb } from "@prisma/client";
import { User } from "../../model/User";

export const mapUserDbToUser = (userDb: UserDb): User => {
  return new User(
    userDb.id,
    userDb.email,
    userDb.pseudo,
    userDb.updateAt,
    userDb.createdAt,
    userDb.admin,
    userDb.firebaseToken
  );
};
