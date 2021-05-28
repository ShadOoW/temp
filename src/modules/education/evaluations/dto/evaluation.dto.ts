import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { AnswerDto } from './answer.dto';
import { QuizDto } from '../../quizzes/dto/quiz.dto';

@ObjectType()
export class EvaluationDto extends AbstractDto {
  @Field(() => String, {
    description: 'title of the evaluation',
    nullable: true,
  })
  title: string;

  @Field(() => QuizDto, {
    description: 'Questions of the evaluation',
    nullable: true,
  })
  quiz: QuizDto;

  @Field(() => [AnswerDto], {
    description: 'Answer of the evaluation',
    nullable: true,
  })
  answers: AnswerDto[];

  @Field(() => UserDto, { nullable: true })
  mentor: UserDto;

  @Field(() => UserDto, { nullable: true })
  mentee: UserDto;

  constructor(evaluation: EvaluationEntity) {
    super(evaluation);
    this.title = evaluation.title;
    this.quiz = evaluation.quiz;
    this.answers = evaluation.answers;
    this.mentor = evaluation.mentor;
    this.mentee = evaluation.mentee;
  }
}
