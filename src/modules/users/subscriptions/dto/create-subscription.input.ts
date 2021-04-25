import { IsUUID } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { SubscriptionUserInput } from './subscription.inputs';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => SubscriptionUserInput)
  @IsUUID()
  subscriber: UserEntity;

  @Field(() => SubscriptionUserInput)
  @IsUUID()
  subscribedTo: UserEntity;
}
