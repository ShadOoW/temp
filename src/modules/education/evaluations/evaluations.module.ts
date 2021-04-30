import { Module } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsResolver } from './evaluations.resolver';
import { EvaluationEntity } from './entities/evaluation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationEntity])],
  providers: [EvaluationsResolver, EvaluationsService],
})
export class EvaluationsModule {}
