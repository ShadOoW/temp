import { CreateBalanceInput } from './create-balance.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { BalancePointInput } from './balance.inputs';

@InputType()
export class UpdateBalanceInput extends PartialType(CreateBalanceInput) {
  @Field(() => Int)
  score: number;

  @Field(() => [BalancePointInput])
  points: BalancePointInput[];
}
