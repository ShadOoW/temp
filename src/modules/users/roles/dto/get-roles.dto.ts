import { Role } from '../entities/role.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetRoles {
  @Field(() => [Role])
  roles: Role[];

  @Field(() => Int)
  totalCount: number;
}
