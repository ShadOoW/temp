import { RoleEntity } from '../entities/role.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetRoles {
  @Field(() => [RoleEntity])
  roles: RoleEntity[];

  @Field(() => Int)
  totalCount: number;
}
