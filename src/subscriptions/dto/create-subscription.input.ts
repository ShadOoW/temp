import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { SubscriptionUserInput } from './subscription.inputs';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => SubscriptionUserInput)
  subscriber: User;

  @Field(() => SubscriptionUserInput)
  subscribedTo: User;
}
