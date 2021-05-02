import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from '@users/profiles/profiles.module';
import { ProfilesService } from '@users/profiles/profiles.service';
import { ProfileEntity } from '@users/profiles/entities/profile.entity';
import { CaslModule } from '@users/casl/casl.module';
import { EmailsService } from '@users/emails/emails.service';
import { UserRepository } from './user.repository';
// import { ChatModule } from '../chat/chat.module';
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, ProfileEntity]),
    ProfilesModule,
    CaslModule,
  ],
  exports: [UsersService, TypeOrmModule],
  providers: [UsersResolver, UsersService, ProfilesService, EmailsService],
})
export class UsersModule {}
