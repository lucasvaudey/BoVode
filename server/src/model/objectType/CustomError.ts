import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CustomError {
  @Field(() => String)
  label: string;
  @Field()
  message: string;
}
