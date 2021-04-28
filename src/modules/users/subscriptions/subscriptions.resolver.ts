import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { GetSubscriptions, GetSubscribers } from './dto/get-subscriptions.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionsPageOptionsDto } from './dto/subscriptions-page-options.dto';
import { SubscriptionsPageDto } from './dto/subscriptions-page.dto';

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
  @Query(() => SubscriptionsPageDto, { name: 'subscriptions' })
  findSubscriptions(
    @Args('id', { type: () => String }) id: string,
    @Args() pageOptionsDto: SubscriptionsPageOptionsDto,
  ) {
    return this.subscriptionsService.findSubscriptions({
      id,
      ...pageOptionsDto,
    });
  }
  // TODO Get user id
  @Query(() => SubscriptionsPageDto, { name: 'subscribers' })
  findSubscribers(
    @Args('id', { type: () => String }) id: string,
    @Args() pageOptionsDto: SubscriptionsPageOptionsDto,
  ) {
    return this.subscriptionsService.findSubscribers({ id, ...pageOptionsDto });
  }
}
