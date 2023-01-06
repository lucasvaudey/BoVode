import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  pseudo: string;

  @Field()
  updateAt: Date;

  @Field()
  createdAt: Date;

  @Field(() => Boolean)
  admin: boolean;

  firebaseToken: string | null;

  constructor(
    id: number,
    email: string,
    pseudo: string,
    updateAt: Date,
    createdAt: Date,
    admin: boolean,
    firebaseToken: string | null
  ) {
    this.id = id;
    this.email = email;
    this.pseudo = pseudo;
    this.updateAt = updateAt;
    this.createdAt = createdAt;
    this.admin = admin;
    this.firebaseToken = firebaseToken;
  }
}
