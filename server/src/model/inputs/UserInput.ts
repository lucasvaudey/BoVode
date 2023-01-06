import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  email: string | null;
  @Field(() => String, { nullable: true })
  pseudo: string | null;
  @Field(() => Boolean, { nullable: true })
  admin: boolean | null;
}
