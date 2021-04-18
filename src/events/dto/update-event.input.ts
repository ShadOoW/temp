import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field(() => String)
  read: boolean;
}
