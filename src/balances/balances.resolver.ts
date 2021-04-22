import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BalancesService } from './balances.service';
import { Balance } from './entities/balance.entity';
import { UpdateBalanceInput } from './dto/update-balance.input';

@Resolver(() => Balance)
export class BalancesResolver {
  constructor(private readonly balancesService: BalancesService) {}

  @Mutation(() => Balance)
  updateBalance(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBalanceInput') updateBalanceInput: UpdateBalanceInput,
  ) {
    return this.balancesService.update(id, updateBalanceInput);
  }
}
