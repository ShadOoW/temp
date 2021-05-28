import { Module } from '@nestjs/common';
import { QuizSolutionsService } from './quizSolutions.service';
import { QuizSolutionsResolver } from './quizSolutions.resolver';
import { QuizSolutionEntity } from './entities/quizSolution.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSolutionEntity])],
  providers: [QuizSolutionsResolver, QuizSolutionsService],
})
export class QuizSolutionsModule {}
