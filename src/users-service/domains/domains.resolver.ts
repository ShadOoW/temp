import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DomainsService } from './domains.service';
import { Domain } from './entities/domain.entity';
import { CreateDomainInput } from './dto/create-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { PaginationArgs } from '../../shared/pagination.args';
import { GetDomains } from './dto/get-domains.dto';
import { Public } from '../../shared/public.decorator';

@Resolver(() => Domain)
export class DomainsResolver {
  constructor(private readonly domainsService: DomainsService) {}

  @Mutation(() => Domain)
  createDomain(
    @Args('createDomainInput')
    createDomainInput: CreateDomainInput,
  ) {
    return this.domainsService.create(createDomainInput);
  }

  @Public()
  @Query(() => GetDomains, { name: 'domains' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.domainsService.findAll(paginationArgs);
  }

  @Query(() => Domain, { name: 'domain' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.domainsService.findOne(id);
  }

  @Mutation(() => Domain)
  updateDomain(
    @Args('id', { type: () => String }) id: string,
    @Args('updateDomainInput')
    updateDomainInput: UpdateDomainInput,
  ) {
    return this.domainsService.update(id, updateDomainInput);
  }

  @Mutation(() => Domain)
  removeDomain(@Args('id', { type: () => String }) id: string) {
    return this.domainsService.remove(id);
  }
}
