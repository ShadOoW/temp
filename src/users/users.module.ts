import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { ProfilesService } from '../profiles/profiles.service';
import { Profile } from '../profiles/entities/profile.entity';
import { CaslModule } from '../casl/casl.module';
import { EmailsService } from '../emails/emails.service';
import { UsersRepository } from './users.repository';
// import { ChatModule } from '../chat/chat.module';
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    ProfilesModule,
    CaslModule,
  ],
  exports: [UsersService, TypeOrmModule],
  providers: [UsersResolver, UsersService, ProfilesService, EmailsService],
})
export class UsersModule {}
