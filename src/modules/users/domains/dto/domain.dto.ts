import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { DomainEntity } from '../entities/domain.entity';

@ObjectType()
export class DomainDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  parent?: string;

  constructor(domain: DomainEntity) {
    super(domain);
    this.name = domain.name;
    this.type = domain.type;
    this.parent = domain.parent;
  }
}
