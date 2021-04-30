import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizEntity } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  providers: [QuizzesResolver, QuizzesService],
})
export class QuizzesModule {}
