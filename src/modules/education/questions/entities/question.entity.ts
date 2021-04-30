import { UserEntity } from '@users/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { PropositionDto } from '../dto/proposition.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { QuestionDto } from '../dto/question.dto';

@Entity({ name: 'questions' })
export class QuestionEntity extends AbstractEntity<QuestionDto> {
  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;

  @Column({ type: 'json' })
  propositions: PropositionDto[];

  @ManyToOne(() => UserEntity, (user) => user.questions)
  user: UserEntity;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  dtoClass = QuestionDto;
}
