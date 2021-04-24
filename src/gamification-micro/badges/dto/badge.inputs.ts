import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class BadgePointInput {
  @Field(() => String)
  @IsString()
  id: string;
}
