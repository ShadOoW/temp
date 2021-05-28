import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { QuizSolutionEntity } from '../entities/quizSolution.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { AnswerDto } from './answer.dto';
import { QuizDto } from '../../quizzes/dto/quiz.dto';

@ObjectType()
export class QuizSolutionDto extends AbstractDto {
  @Field(() => String, {
    description: 'title of the quizSolution',
    nullable: true,
  })
  title: string;

  @Field(() => QuizDto, {
    description: 'Questions of the quizSolution',
    nullable: true,
  })
  quiz: QuizDto;

  @Field(() => [AnswerDto], {
    description: 'Answer of the quizSolution',
    nullable: true,
  })
  answers: AnswerDto[];

  @Field(() => UserDto, { nullable: true })
  mentor: UserDto;

  @Field(() => UserDto, { nullable: true })
  mentee: UserDto;

  constructor(quizSolution: QuizSolutionEntity) {
    super(quizSolution);
    this.title = quizSolution.title;
    this.quiz = quizSolution.quiz;
    this.answers = quizSolution.answers;
    this.mentor = quizSolution.mentor;
    this.mentee = quizSolution.mentee;
  }
}
