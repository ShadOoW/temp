import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLanguageInput {
  @Field(() => String)
  @IsString()
  name: string;
}
