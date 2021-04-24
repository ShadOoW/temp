import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class RolePermissionInput {
  @Field(() => String)
  @IsUUID()
  id: string;
}
