import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsResolver } from './domains.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '@users/casl/casl.module';
import { DomainEntity } from './entities/domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DomainEntity]), CaslModule],
  providers: [DomainsResolver, DomainsService],
})
export class DomainsModule {}
