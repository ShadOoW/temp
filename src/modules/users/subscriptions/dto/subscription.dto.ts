import { ObjectType, Field } from '@nestjs/graphql';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { SubscriptionEntity } from '../entities/subscription.entity';

@ObjectType('UserSubscription')
export class SubscriptionDto extends AbstractDto {
  @Field(() => UserDto)
  subscriber: UserDto;

  @Field(() => UserDto)
  subscribedTo: UserDto;

  constructor(subscription: SubscriptionEntity) {
    super(subscription);
    this.subscriber = subscription.subscriber;
    this.subscribedTo = subscription.subscribedTo;
  }
}
