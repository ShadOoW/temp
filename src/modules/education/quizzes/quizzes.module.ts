import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizEntity } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@src/modules/users/users/users.service';
import { ProfilesService } from '@src/modules/users/profiles/profiles.service';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { UserEntity } from '@src/modules/users/users/entities/user.entity';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity, UserEntity, ProfileEntity])],
  providers: [
    QuizzesResolver,
    QuizzesService,
    UsersService,
    ProfilesService,
    EmailsService,
  ],
})
export class QuizzesModule {}
