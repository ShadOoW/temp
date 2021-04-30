import { Evaluation } from '@education/evaluations/entities/evaluation.entity';
import { QuestionEntity } from '@education/questions/entities/question.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuestionDto } from '@education/questions/dto/question.dto';
import { QuizDto } from '../dto/quiz.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'quizzes' })
export class QuizEntity extends AbstractEntity<QuizDto> {
  @Column({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endAt?: Date;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionDto[];

  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  user: UserEntity;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.quiz)
  evaluations: Evaluation;

  dtoClass = QuizDto;
}
