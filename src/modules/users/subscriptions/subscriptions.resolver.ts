import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { GetSubscriptions, GetSubscribers } from './dto/get-subscriptions.dto';
import { PaginationArgs } from '@shared/pagination.args';

@Resolver(() => Subscription)
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Mutation(() => Subscription)
  createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput,
  ) {
    return this.subscriptionsService.create(createSubscriptionInput);
  }

  @Query(() => GetSubscriptions, { name: 'subscriptions' })
  findSubscriptions(
    @Args() paginationArgs: PaginationArgs,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.subscriptionsService.findSubscriptions({
      ...paginationArgs,
      subscriber: id,
    });
  }

  @Query(() => GetSubscribers, { name: 'subscribers' })
  findSubscribers(
    @Args() paginationArgs: PaginationArgs,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.subscriptionsService.findSubscribers({
      ...paginationArgs,
      subscribedTo: id,
    });
  }

  @Mutation(() => Subscription)
  removeSubscription(@Args('id', { type: () => Int }) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
