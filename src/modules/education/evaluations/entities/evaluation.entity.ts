import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'evaluations' })
export class Evaluation extends BaseEntity {
  @Field(() => Int, { description: 'Score of the quiz' })
  @Column({ type: 'int' })
  @IsNumber()
  score: number;

  @Field(() => Date, {
    description: 'Started Time of the quiz',
    nullable: true,
  })
  @Column({ type: 'timestamptz', nullable: true })
  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @Field(() => Int, {
    description: 'Time spent on quiz',
    nullable: true,
  })
  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsNumber()
  timeSpent?: number;

  @Field(() => String, {
    description: 'User note',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  note?: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.evaluations)
  quiz: Quiz;

  @ManyToOne(() => UserEntity, (user) => user.evaluations)
  user: UserEntity;
}
