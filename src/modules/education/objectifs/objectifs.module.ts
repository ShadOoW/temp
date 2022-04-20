import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ObjectifsService } from './objectifs.service';
import { ObjectifsResolver } from './objectifs.resolver';
import { ObjectifEntity } from './entities/objectif.entity';
import { UsersService } from '@users/users/users.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { ProfilesService } from '@src/modules/users/profiles/profiles.service';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';
import { EmailsService } from '@src/modules/users/emails/emails.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectifEntity, UserEntity, ProfileEntity]),
  ],
  providers: [
    ObjectifsResolver,
    ObjectifsService,
    UsersService,
    ProfilesService,
    EmailsService,
  ],
})
export class ObjectifModule {}
