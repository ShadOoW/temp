import { CreateDomainInput } from './create-domain.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateDomainInput extends PartialType(CreateDomainInput) {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  type: string;

  @Field(() => String)
  @IsString()
  parent?: string;
}
