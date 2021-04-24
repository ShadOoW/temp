import { Inject, UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import {
  CreatePrivateRequestInput,
  CreatePublicRequestInput,
  CreateRequestInput,
} from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { GetRequestsArgs } from './dto/get-requests.args';
import { GetRequest, GetRequests } from './dto/get-requests.dto';
import { PubSub } from 'graphql-subscriptions';
import { PaginationArgs } from '../../shared/pagination.args';

@Resolver(() => Request)
@UseGuards(PoliciesGuard)
export class RequestsResolver {
  constructor(
    private readonly requestsService: RequestsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Request)
  createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ) {
    return this.requestsService.create(createRequestInput).then((event) => {
      return event;
    });
  }

  @Mutation(() => Request)
  createPrivateRequest(
    @Args('createPrivateRequestInput')
    createPrivateRequestInput: CreatePrivateRequestInput,
  ) {
    return this.requestsService
      .create(createPrivateRequestInput)
      .then((event) => {
        return event;
      });
  }

  @Mutation(() => Request)
  createPublicRequest(
    @Args('createPublicRequestInput')
    createPublicRequestInput: CreatePublicRequestInput,
  ) {
    return this.requestsService
      .create(createPublicRequestInput)
      .then((event) => {
        // this.pubSub.publish('notification', { notification: event });
        // this.pubSub.publish('activity', { activity: event });
        return event;
      });
  }

  @Query(() => GetRequests, { name: 'requests' })
  findAll(@Args() args: GetRequestsArgs) {
    const { mentee: from, mentor: to } = args;
    delete args.mentee;
    delete args.mentor;
    return this.requestsService.findAll({ ...args, from, to });
  }

  @Query(() => GetRequest, { name: 'menteePublicRequest', nullable: true })
  async findUserPublic(
    @Args('mentee', { type: () => String }) from: string,
    @Args() args: PaginationArgs,
  ) {
    const menteePublicRequest = await this.requestsService.findAll({
      ...args,
      from,
      to: null,
    });
    return menteePublicRequest.requests[0] || {};
  }

  @Query(() => Boolean, { name: 'canRequest' })
  canRequest(@Args('mentee', { type: () => String }) mentee: string) {
    return this.requestsService.canRequest(mentee);
  }

  @Query(() => GetRequests, { name: 'publicRequests' })
  findPublic(@Args() args: PaginationArgs) {
    return this.requestsService.findAll({
      ...args,
      to: null,
      status: 'created',
    });
  }

  @Query(() => GetRequest, { name: 'request' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.requestsService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
  ) {
    return this.requestsService.update(id, updateRequestInput);
  }

  @Mutation(() => Request)
  removeRequest(@Args('id', { type: () => String }) id: string) {
    return this.requestsService.remove(id);
  }
}
