import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsResolver } from './points.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointEntity])],
  providers: [PointsResolver, PointsService],
})
export class PointsModule {}
