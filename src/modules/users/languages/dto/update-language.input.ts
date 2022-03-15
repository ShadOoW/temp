import { CreateLanguageInput } from './create-language.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  @Field(() => String)
  @IsString()
  name: string;
}
