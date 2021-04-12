import { CreatePermissionInput } from './create-permission.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;
}
