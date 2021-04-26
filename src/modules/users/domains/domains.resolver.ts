import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DomainsService } from './domains.service';
import { CreateDomainInput } from './dto/create-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { Public } from '@shared/public.decorator';
import { DomainDto } from './dto/domain.dto';
import { DomainsPageDto } from './dto/domains-page.dto';
import { DomainsPageOptionsDto } from './dto/domains-page-options.dto';

@Resolver(() => DomainDto)
export class DomainsResolver {
  constructor(private readonly domainsService: DomainsService) {}

  @Mutation(() => DomainDto)
  createDomain(
    @Args('createDomainInput')
    createDomainInput: CreateDomainInput,
  ): Promise<DomainDto> {
    return this.domainsService.create(createDomainInput);
  }

  @Public()
  @Query(() => DomainsPageDto, { name: 'domains' })
  findAll(
    @Args() pageOptionsDto: DomainsPageOptionsDto,
  ): Promise<DomainsPageDto> {
    return this.domainsService.findAll(pageOptionsDto);
  }

  @Query(() => DomainDto, { name: 'domain' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<DomainDto> {
    return this.domainsService.findOne(id);
  }

  @Mutation(() => DomainDto)
  updateDomain(
    @Args('id', { type: () => String }) id: string,
    @Args('updateDomainInput')
    updateDomainInput: UpdateDomainInput,
  ): Promise<DomainDto> {
    return this.domainsService.update(id, updateDomainInput);
  }

  @Mutation(() => DomainDto)
  removeDomain(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DomainDto> {
    return this.domainsService.remove(id);
  }
}
