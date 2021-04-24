import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesResolver } from './balances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [BalancesResolver, BalancesService],
})
export class BalancesModule {}
