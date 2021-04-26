import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/shared/abstract.dto';
import { DomainEntity } from '../entities/domain.entity';

@ObjectType()
export class DomainDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;

  constructor(user: DomainEntity) {
    super(user);
    this.name = user.name;
    this.description = user.description;
  }
}
