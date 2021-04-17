import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { GetRequestsArgs } from './dto/get-requests.args';
import { GetRequest, GetRequests } from './dto/get-requests.dto';

@Resolver(() => Request)
@UseGuards(PoliciesGuard)
export class RequestsResolver {
  constructor(private readonly requestsService: RequestsService) {}

  @Mutation(() => Request)
  createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ) {
    return this.requestsService.create(createRequestInput);
  }

  @Query(() => GetRequests, { name: 'requests' })
  findAll(@Args() args: GetRequestsArgs) {
    const { mentee: from, mentor: to } = args;
    delete args.mentee;
    delete args.mentor;
    return this.requestsService.findAll({ ...args, from, to });
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
