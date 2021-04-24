import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class BalancePointInput {
  @Field(() => String)
  @IsString()
  id: string;
}
