import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/Abstract.dto';
import { RoleEntity } from '../entities/role.entity';

@ObjectType()
export class RoleDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  constructor(role: RoleEntity) {
    super(role);
    this.name = role.name;
    this.description = role.description;
  }
}
