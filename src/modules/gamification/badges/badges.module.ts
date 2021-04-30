import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesResolver } from './badges.resolver';
import { BadgeEntity } from './entities/badge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeEntity])],
  providers: [BadgesResolver, BadgesService],
})
export class BadgesModule {}
