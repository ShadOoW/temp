import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';
import { Question } from '../../questions/entities/question.entity';
import { BaseEntity } from '../../../shared/base.entity';
import { User } from '../../../users-micro/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'quizzes' })
export class Quiz extends BaseEntity {
  @Field(() => Date, { description: 'Date to start the quiz', nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @Field(() => Date, { description: 'Date to end the quiz', nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  endAt?: Date;

  @Field(() => Int, {
    description: 'Duration of the quiz on minutes',
    nullable: true,
  })
  @Column({ type: 'int', nullable: true })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => String, { description: 'Title of the quiz' })
  @Column({ type: 'varchar', length: 300 })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'Description of the quiz',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, {
    description: 'Image of the quiz',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 300, nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @OneToMany(() => Question, (question) => question.quiz)
  @Field(() => [Question], {
    description: 'Questions of the quiz',
    nullable: true,
  })
  questions: Question[];

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.quiz)
  evaluations: Evaluation;
}
