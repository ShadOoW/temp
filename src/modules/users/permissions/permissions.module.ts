import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { Permission } from './entities/permission.entity';
import { CaslModule } from '@users/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), CaslModule],
  providers: [PermissionsResolver, PermissionsService],
})
export class PermissionsModule {}
