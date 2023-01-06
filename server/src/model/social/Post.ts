import { GraphQLURL } from "graphql-custom-types";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "../User";

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => GraphQLURL, { nullable: true })
  url?: string;

  @Field(() => User)
  user: User;
}
