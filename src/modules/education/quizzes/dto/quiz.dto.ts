import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Evaluation } from '@education/evaluations/entities/evaluation.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { QuestionDto } from '@education/questions/dto/question.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { QuizEntity } from '../entities/quiz.entity';

@ObjectType()
export class QuizDto extends AbstractDto {
  @Field(() => Date, { description: 'Date to start the quiz', nullable: true })
  startAt?: Date;

  @Field(() => Date, { description: 'Date to end the quiz', nullable: true })
  endAt?: Date;

  @Field(() => Int, {
    description: 'Duration of the quiz on minutes',
    nullable: true,
  })
  duration?: number;

  @Field(() => String, { description: 'Title of the quiz' })
  title: string;

  @Field(() => String, {
    description: 'Description of the quiz',
    nullable: true,
  })
  description?: string;

  @Field(() => String, {
    description: 'Image of the quiz',
    nullable: true,
  })
  image?: string;

  @Field(() => [QuestionDto], {
    description: 'Questions of the quiz',
    nullable: true,
  })
  questions: QuestionDto[];

  user: UserEntity;

  evaluations: Evaluation;

  constructor(quiz: QuizEntity) {
    super(quiz);
    this.startAt = quiz.startAt;
    this.endAt = quiz.endAt;
    this.duration = quiz.duration;
    this.endAt = quiz.endAt;
    this.title = quiz.title;
    this.description = quiz.description;
    this.image = quiz.image;
    this.questions = quiz.questions;
    this.user = quiz.user;
    this.evaluations = quiz.evaluations;
  }
}
