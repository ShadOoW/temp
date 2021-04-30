import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BalancesService } from './balances.service';
import { BalanceEntity } from './entities/balance.entity';
import { UpdateBalanceInput } from './dto/update-balance.input';
import { BalanceDto } from './dto/balance.dto';

@Resolver(() => BalanceDto)
export class BalancesResolver {
  constructor(private readonly balancesService: BalancesService) {}

  @Mutation(() => BalanceDto)
  updateBalance(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBalanceInput') updateBalanceInput: UpdateBalanceInput,
  ) {
    return this.balancesService.update(id, updateBalanceInput);
  }
}
