import { IsUUID } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { SubscriptionUserInput } from './subscription.inputs';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => SubscriptionUserInput)
  @IsUUID()
  subscriber: User;

  @Field(() => SubscriptionUserInput)
  @IsUUID()
  subscribedTo: User;
}
