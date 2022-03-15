import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { DomainEntity } from '../entities/domain.entity';

@ObjectType()
export class DomainDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  type?: string;

  @Field(() => String)
  parent: string;

  constructor(domain: DomainEntity) {
    super(domain);
    this.name = domain.name;
    this.type = domain.type;
  }
}
