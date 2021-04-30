import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { PropositionDto } from '../dto/proposition.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { QuestionEntity } from '../entities/question.entity';

@ObjectType()
export class QuestionDto extends AbstractDto {
  @Field(() => Int, { description: 'Order of the question' })
  order: number;

  @Field(() => Int, {
    description: 'Duration of the question on seconds',
    nullable: true,
  })
  duration?: number;

  @Field(() => String, { description: 'Title of the question' })
  title: string;

  @Field(() => String, {
    description: 'Description of the question',
    nullable: true,
  })
  description?: string;

  @Field(() => String, {
    description: 'Description of the question',
    nullable: true,
  })
  image?: string;

  @Field(() => [PropositionDto], { description: 'Titile of the question' })
  propositions: PropositionDto[];

  user: UserEntity;

  quiz: Quiz;

  constructor(question: QuestionEntity) {
    super(question);
    this.order = question.order;
    this.duration = question.duration;
    this.title = question.title;
    this.description = question.description;
    this.image = question.image;
    this.user = question.user;
    this.quiz = question.quiz;
  }
}
