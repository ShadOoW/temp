import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';

@Resolver(() => Request)
export class RequestsResolver {
  constructor(private readonly requestsService: RequestsService) {}

  @Mutation(() => Request)
  createRequest(@Args('createRequestInput') createRequestInput: CreateRequestInput) {
    return this.requestsService.create(createRequestInput);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll() {
    return this.requestsService.findAll();
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requestsService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(@Args('updateRequestInput') updateRequestInput: UpdateRequestInput) {
    return this.requestsService.update(updateRequestInput.id, updateRequestInput);
  }

  @Mutation(() => Request)
  removeRequest(@Args('id', { type: () => Int }) id: number) {
    return this.requestsService.remove(id);
  }
}
