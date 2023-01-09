import { PostDb } from "@prisma/client";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  constructor(post: PostDb) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
  }
}
