import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreatePermissionInput } from './create-permission.input';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;
}
