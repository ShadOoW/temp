import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { SubscriptionUserInput } from './subscription.inputs';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => SubscriptionUserInput)
  subscriber: UserEntity;

  @Field(() => SubscriptionUserInput)
  subscribedTo: UserEntity;
}
