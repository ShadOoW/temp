import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { GetSubscriptions, GetSubscribers } from './dto/get-subscriptions.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionsPageOptionsDto } from './dto/subscriptions-page-options.dto';

@Resolver(() => SubscriptionDto)
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Mutation(() => SubscriptionDto)
  createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput,
  ) {
    return this.subscriptionsService.create(createSubscriptionInput);
  }
  // TODO Get user id
  @Query(() => GetSubscriptions, { name: 'subscriptions' })
  findSubscriptions(@Args() pageOptionsDto: SubscriptionsPageOptionsDto) {
    return this.subscriptionsService.findSubscriptions(pageOptionsDto);
  }
  // TODO Get user id
  @Query(() => GetSubscribers, { name: 'subscribers' })
  findSubscribers(@Args() pageOptionsDto: SubscriptionsPageOptionsDto) {
    return this.subscriptionsService.findSubscribers(pageOptionsDto);
  }
  // TODO Remove subscription
  @Mutation(() => SubscriptionDto)
  removeSubscription(@Args('id', { type: () => Int }) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
