import { Domain } from '../entities/domain.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetDomains {
  @Field(() => [Domain])
  domains: Domain[];

  @Field(() => Int)
  totalCount: number;
}
