import { Post } from "../model/social/Post";
import { Query, Resolver } from "type-graphql";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts() {}
}
