import { ObjectType, Field } from '@nestjs/graphql';
import { QuestionDto } from '@src/modules/education/quizzes/dto/question.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { QuizEntity } from '../entities/quiz.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';

@ObjectType()
export class QuizDto extends AbstractDto {
  @Field(() => String, {
    description: 'title of the quiz',
    nullable: true,
  })
  title: string;

  @Field(() => [QuestionDto], {
    description: 'Questions of the quiz',
    nullable: true,
  })
  questions: QuestionDto[];

  @Field(() => UserDto, { nullable: true })
  mentor: UserDto;

  @Field(() => [UserDto], { nullable: true })
  mentees: UserDto[];

  constructor(quiz: QuizEntity) {
    super(quiz);
    this.title = quiz.title;
    this.questions = quiz.questions;
    this.mentor = quiz.mentor;
    this.mentees = quiz.mentees;
  }
}
