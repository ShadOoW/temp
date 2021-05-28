import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EvaluationDto } from '../dto/evaluation.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { AnswerDto } from '../dto/answer.dto';
import { QuizEntity } from '../../quizzes/entities/quiz.entity';
import { QuizDto } from '../../quizzes/dto/quiz.dto';

@Entity({ name: 'evaluations' })
export class EvaluationEntity extends AbstractEntity<EvaluationDto> {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.evaluations)
  quiz: QuizDto;

  @Column({ type: 'jsonb', nullable: true })
  answers: AnswerDto[];

  @ManyToOne(() => UserEntity, (user) => user.evaluations)
  mentor: UserDto;

  @ManyToOne(() => UserEntity, (user) => user.responses)
  mentee: UserDto;

  dtoClass = EvaluationDto;
}
