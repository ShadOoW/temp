import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../../users-service/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PropositionInput } from '../dto/proposition.input';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '../../../shared/base.entity';
import { PropositionDto } from '../dto/proposition.dto';

@ObjectType()
@Entity({ name: 'questions' })
export class Question extends BaseEntity {
  @Field(() => Int, { description: 'Order of the question' })
  @Column({ type: 'int' })
  @IsNumber()
  order: number;

  @Field(() => Int, {
    description: 'Duration of the question on seconds',
    nullable: true,
  })
  @Column({ type: 'int', nullable: true })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => String, { description: 'Title of the question' })
  @Column({ type: 'text' })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'Description of the question',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, {
    description: 'Description of the question',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 300, nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({ type: 'json' })
  @Field(() => [PropositionDto], { description: 'Titile of the question' })
  @IsArray()
  propositions: PropositionDto[];

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
