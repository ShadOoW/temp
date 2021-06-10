import { UserEntity } from '@users/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { QuestionDto } from '@src/modules/education/quizzes/dto/question.dto';
import { QuizDto } from '../dto/quiz.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { QuizSolutionEntity } from '../../quizSolution/entities/quizSolution.entity';
import { QuizSolutionDto } from '../../quizSolution/dto/quizSolution.dto';

@Entity({ name: 'quizzes' })
export class QuizEntity extends AbstractEntity<QuizDto> {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'simple-json', nullable: true })
  questions: QuestionDto[];

  @OneToMany(() => QuizSolutionEntity, (quizSolution) => quizSolution.quiz)
  quizSolutions: QuizSolutionDto[];

  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  mentor: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.participate)
  @JoinTable()
  mentees: UserDto[];

  dtoClass = QuizDto;
}
