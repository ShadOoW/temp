import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { UserEntity } from '@users/users/entities/user.entity';
import { QuizDto } from '../../quizzes/dto/quiz.dto';
import { EvaluationEntity } from '../entities/evaluation.entity';

@ObjectType()
export class EvaluationDto extends AbstractDto {
  @Field(() => Int, { description: 'Score of the quiz' })
  score: number;

  @Field(() => Date, {
    description: 'Started Time of the quiz',
    nullable: true,
  })
  startAt?: Date;

  @Field(() => Int, {
    description: 'Time spent on quiz',
    nullable: true,
  })
  timeSpent?: number;

  @Field(() => String, {
    description: 'User note',
    nullable: true,
  })
  note?: string;

  quiz: QuizDto;

  user: UserEntity;

  constructor(evaluation: EvaluationEntity) {
    super(evaluation);
    this.score = evaluation.score;
    this.startAt = evaluation.startAt;
    this.note = evaluation.note;
    this.quiz = evaluation.quiz;
    this.user = evaluation.user;
  }
}
