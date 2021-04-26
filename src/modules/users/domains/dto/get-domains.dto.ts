import { DomainEntity } from '../entities/domain.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetDomains {
  @Field(() => [DomainEntity])
  domains: DomainEntity[];

  @Field(() => Int)
  totalCount: number;
}
