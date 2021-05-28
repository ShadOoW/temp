import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { QuizSolutionDto } from '../dto/quizSolution.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { AnswerDto } from '../dto/answer.dto';
import { QuizEntity } from '../../quizzes/entities/quiz.entity';
import { QuizDto } from '../../quizzes/dto/quiz.dto';

@Entity({ name: 'quizSolutions' })
export class QuizSolutionEntity extends AbstractEntity<QuizSolutionDto> {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.quizSolutions)
  quiz: QuizDto;

  @Column({ type: 'jsonb', nullable: true })
  answers: AnswerDto[];

  @ManyToOne(() => UserEntity, (user) => user.quizSolutions)
  mentor: UserDto;

  @ManyToOne(() => UserEntity, (user) => user.responses)
  mentee: UserDto;

  dtoClass = QuizSolutionDto;
}
