import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubscriptionDto } from './subscription.dto';

@ObjectType()
export class GetSubscriptions {
  @Field(() => [SubscriptionDto])
  subscriptions: SubscriptionDto[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class GetSubscribers {
  @Field(() => [SubscriptionDto])
  subscribers: SubscriptionDto[];

  @Field(() => Int)
  totalCount: number;
}
