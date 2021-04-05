import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SubscriptionUserInput {
  @Field(() => String)
  id: string;
}
