import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { GetRequestsArgs } from './dto/get-requests.args';
import { GetRequests } from './dto/get-roles.dto';

@Resolver(() => Request)
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
    return this.requestsService.findAll(args);
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.requestsService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
  ) {
    return this.requestsService.update(
      updateRequestInput.id,
      updateRequestInput,
    );
  }

  @Mutation(() => Request)
  removeRequest(@Args('id', { type: () => String }) id: string) {
    return this.requestsService.remove(id);
  }
}
