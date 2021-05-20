import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import {
  CreatePrivateRequestInput,
  CreatePublicRequestInput,
  CreateRequestInput,
} from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestsPageDto } from './dto/requests-page.dto';
import { RequestsPageOptionsDto } from './dto/requests-page-options.dto';
import { RequestDto } from './dto/request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User as CurrentUser } from '@src/decorators/user.decorator';

// @UseGuards(PoliciesGuard)
@Resolver(() => RequestDto)
export class RequestsResolver {
  constructor(
    private readonly requestsService: RequestsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => RequestDto)
  createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
    @CurrentUser() user,
  ) {
    return this.requestsService.create(createRequestInput).then((event) => {
      this.eventEmitter.emit('request.created', { ...event, userId: user.id });
      return event;
    });
  }

  @Mutation(() => RequestDto)
  createPrivateRequest(
    @Args('createPrivateRequestInput')
    createPrivateRequestInput: CreatePrivateRequestInput,
    @CurrentUser() user,
  ) {
    return this.requestsService
      .create(createPrivateRequestInput)
      .then((event) => {
        this.eventEmitter.emit('request.created', {
          ...event,
          userId: user.id,
        });
        return event;
      });
  }

  @Mutation(() => RequestDto)
  createPublicRequest(
    @Args('createPublicRequestInput')
    createPublicRequestInput: CreatePublicRequestInput,
  ) {
    return this.requestsService.create(createPublicRequestInput);
  }

  @Query(() => RequestsPageDto, { name: 'requests' })
  findAll(@Args() args: RequestsPageOptionsDto): Promise<RequestsPageDto> {
    return this.requestsService.findAll(args);
  }

  @Query(() => RequestDto, { name: 'menteePublicRequest', nullable: true })
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

  @Query(() => RequestDto, { name: 'request' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<RequestDto> {
    return this.requestsService.findOne(id);
  }

  @Mutation(() => RequestDto)
  updateRequest(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
    @CurrentUser() user,
  ): Promise<RequestDto> {
    return this.requestsService.update(id, updateRequestInput).then((event) => {
      this.eventEmitter.emit('request.updated', { ...event, userId: user.id });
      return event;
    });
  }

  @Mutation(() => RequestDto)
  removeRequest(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user,
  ): Promise<RequestDto> {
    return this.requestsService.remove(id).then((event) => {
      this.eventEmitter.emit('request.deleted', { ...event, userId: user.id });
      return event;
    });
  }
}
