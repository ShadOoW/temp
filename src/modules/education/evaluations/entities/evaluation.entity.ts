import { QuizEntity } from '../../quizzes/entities/quiz.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { QuizDto } from '../../quizzes/dto/quiz.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { EvaluationDto } from '../dto/evaluation.dto';

@Entity({ name: 'evaluations' })
export class EvaluationEntity extends AbstractEntity<EvaluationDto> {
  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @Column({ type: 'int', nullable: true })
  timeSpent?: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.evaluations)
  quiz: QuizDto;

  @ManyToOne(() => UserEntity, (user) => user.evaluations)
  user: UserEntity;

  dtoClass = EvaluationDto;
}
