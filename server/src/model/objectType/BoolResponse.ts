import { Field, ObjectType } from "type-graphql";
import { CustomError } from "./CustomError";

@ObjectType()
export class BoolResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => CustomError, { nullable: true })
  error: CustomError | null;

  constructor(success: boolean, error: CustomError | null = null) {
    this.success = success;
    this.error = error;
  }
}
