import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { ProfilesService } from '../profiles/profiles.service';
import { Profile } from '../profiles/entities/profile.entity';
import { CaslModule } from '../casl/casl.module';
import { EmailsService } from '../emails/emails.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    ProfilesModule,
    CaslModule,
  ],
  providers: [UsersResolver, UsersService, ProfilesService, EmailsService],
  exports: [UsersService],
})
export class UsersModule {}
