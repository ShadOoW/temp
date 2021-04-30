import { Inject, UseGuards } from '@nestjs/common';
// import { PoliciesGuard } from '@src/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import {
  CreatePrivateRequestInput,
  CreatePublicRequestInput,
  CreateRequestInput,
} from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { PubSub } from 'graphql-subscriptions';
import { RequestsPageDto } from './dto/requests-page.dto';
import { RequestsPageOptionsDto } from './dto/requests-page-options.dto';
import { RequestDto } from './dto/request.dto';

// @UseGuards(PoliciesGuard)
@Resolver(() => RequestDto)
export class RequestsResolver {
  constructor(
    private readonly requestsService: RequestsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => RequestDto)
  createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ) {
    return this.requestsService.create(createRequestInput).then((event) => {
      return event;
    });
  }

  @Mutation(() => RequestDto)
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

  @Mutation(() => RequestDto)
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

  @Query(() => RequestsPageDto, { name: 'requests' })
  findAll(@Args() args: RequestsPageOptionsDto): Promise<RequestsPageDto> {
    return this.requestsService.findAll(args);
  }

  @Query(() => RequestsPageDto, { name: 'menteePublicRequest', nullable: true })
  async findUserPublic(
    @Args('mentee', { type: () => String }) mentee: string,
    @Args() args: RequestsPageOptionsDto,
  ): Promise<RequestDto> {
    const menteePublicRequest = await this.requestsService.findAll({
      ...args,
      mentee,
      mentor: null,
      status: 'created',
      proposition: false,
    });
    return menteePublicRequest.data[0];
  }

  @Query(() => Boolean, { name: 'canRequest' })
  canRequest(
    @Args('mentee', { type: () => String }) mentee: string,
  ): Promise<boolean> {
    return this.requestsService.canRequest(mentee);
  }

  @Query(() => RequestsPageDto, { name: 'publicRequests' })
  findPublic(@Args() args: RequestsPageOptionsDto): Promise<RequestsPageDto> {
    return this.requestsService.findAll({
      ...args,
      mentor: null,
      status: 'created',
      proposition: false,
    });
  }

  @Query(() => RequestsPageDto, { name: 'request' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<RequestDto> {
    return this.requestsService.findOne(id);
  }

  @Mutation(() => RequestDto)
  updateRequest(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
  ): Promise<RequestDto> {
    return this.requestsService.update(id, updateRequestInput);
  }

  @Mutation(() => RequestDto)
  removeRequest(
    @Args('id', { type: () => String }) id: string,
  ): Promise<RequestDto> {
    return this.requestsService.remove(id);
  }
}
