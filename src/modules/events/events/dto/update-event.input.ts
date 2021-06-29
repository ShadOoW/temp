import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field(() => Boolean)
  read: boolean;
}
