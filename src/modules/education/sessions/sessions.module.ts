import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { SessionEntity } from './entities/session.entity';
import { UsersService } from '@users/users/users.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { ProfilesService } from '@src/modules/users/profiles/profiles.service';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity, UserEntity, ProfileEntity]),
  ],
  providers: [
    SessionsResolver,
    SessionsService,
    UsersService,
    ProfilesService,
    EmailsService,
  ],
})
export class SessionsModule {}

