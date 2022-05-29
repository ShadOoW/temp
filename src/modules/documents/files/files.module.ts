import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { UsersService } from '@users/users/users.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { ProfilesService } from '@src/modules/users/profiles/profiles.service';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, UserEntity, ProfileEntity])],
  providers: [
    FilesResolver,
    FilesService,
    UsersService,
    ProfilesService,
    EmailsService,
  ],
})
export class FilesModule {}
