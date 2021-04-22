import { InputType, Int, Field } from '@nestjs/graphql';
import { BalancePointInput } from './balance.inputs';

@InputType()
export class CreateBalanceInput {
  @Field(() => Int)
  score: number;

  @Field(() => [BalancePointInput])
  points: BalancePointInput[];
}
