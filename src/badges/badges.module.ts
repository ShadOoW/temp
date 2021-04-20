import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesResolver } from './badges.resolver';
import { Badge } from './entities/badge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgesResolver, BadgesService],
})
export class BadgesModule {}
