import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionsPageOptionsDto } from './dto/subscriptions-page-options.dto';
import { SubscriptionsPageDto } from './dto/subscriptions-page.dto';
import { SubscriptionsService } from './subscriptions.service';

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

  @Query(() => SubscriptionsPageDto, { name: 'deletedSubscriptions' })
  deletedSubscriptions(@Args() pageOptionsDto: PageOptionsDto) {
    return this.subscriptionsService.findDeletedSubscriptions({
      ...pageOptionsDto,
    });
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

  @Query(() => Int, { name: 'menteesCount' })
  usersCount(@Args('id', { type: () => String }) userId) {
    return this.subscriptionsService.usersCount(userId);
  }

  @Mutation(() => SubscriptionDto)
  removeSubscription(
    @Args('id', { type: () => String }) id: string,
  ): Promise<SubscriptionDto> {
    return this.subscriptionsService.remove(id);
  }
}
