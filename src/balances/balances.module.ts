import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesResolver } from './balances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from 'src/points/entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [BalancesResolver, BalancesService],
})
export class BalancesModule {}
