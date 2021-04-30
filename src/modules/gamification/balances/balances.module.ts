import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesResolver } from './balances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceEntity } from './entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity])],
  providers: [BalancesResolver, BalancesService],
})
export class BalancesModule {}
