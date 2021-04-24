import { Subscription } from '../entities/subscription.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetSubscriptions {
  @Field(() => [Subscription])
  subscriptions: Subscription[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class GetSubscribers {
  @Field(() => [Subscription])
  subscribers: Subscription[];

  @Field(() => Int)
  totalCount: number;
}
