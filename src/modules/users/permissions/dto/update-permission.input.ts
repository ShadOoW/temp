import { CreatePermissionInput } from './create-permission.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;
}
