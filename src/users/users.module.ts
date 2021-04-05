import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { ProfilesService } from '../profiles/profiles.service';
import { Profile } from '../profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Profile]),
    ProfilesModule,
  ],
  providers: [UsersResolver, UsersService, ProfilesService],
  exports: [UsersService],
})
export class UsersModule {}
