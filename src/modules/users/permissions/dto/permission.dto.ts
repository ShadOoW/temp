import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/shared/abstract.dto';
import { PermissionEntity } from '../entities/permission.entity';

@ObjectType()
export class PermissionDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;

  constructor(user: PermissionEntity) {
    super(user);
    this.name = user.name;
    this.description = user.description;
  }
}
