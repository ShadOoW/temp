import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserQuizInput {
  @Field(() => String, { description: 'Quiz id' })
  @IsString()
  id: string;
}
