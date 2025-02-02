import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Field } from '@nestjs/graphql';
import { RoleEntity } from '@users/roles/entities/role.entity';
import { RequestEntity } from '@users/requests/entities/request.entity';
import { ProfileEntity } from '@users/profiles/entities/profile.entity';
import { SubscriptionEntity } from '@users/subscriptions/entities/subscription.entity';
import { SessionEntity } from '@education/sessions/entities/session.entity';
import { UserStatus } from '../interfaces/user';
import { RoomEntity } from '@src/modules/messaging/chat/entities/room.entity';
import { EventEntity } from '@src/modules/events/events/entities/event.entity';
import { BalanceEntity } from '@gamification/balances/entities/balance.entity';
import { QuizEntity } from '@education/quizzes/entities/quiz.entity';
import { QuizSolutionEntity } from '@src/modules/education/quizSolution/entities/quizSolution.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { ProfileDto } from '../../profiles/dto/profile.dto';
import { SubscriptionDto } from '../../subscriptions/dto/subscription.dto';
import { RequestDto } from '../../requests/dto/request.dto';
import { SessionDto } from '@education/sessions/dto/session.dto';
import { QuizDto } from '@education/quizzes/dto/quiz.dto';
import { QuizSolutionDto } from '@src/modules/education/quizSolution/dto/quizSolution.dto';
import { BalanceDto } from '@src/modules/gamification/balances/dto/balance.dto';
import { EventDto } from '@src/modules/events/events/dto/event.dto';
import { ObjectifEntity } from '@education/objectifs/entities/objectif.entity';
import { ObjectifDto } from '@education/objectifs/dto/objectif.dto';
import { FileDto } from '@documents/files/dto/file.dto';
import { FileEntity } from '@documents/files/entities/file.entity';
import { FileTagDto } from '@documents/file-tags/dto/file-tag.dto';
import { FileTagEntity } from '@documents/file-tags/entities/file-tag.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  username?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  password: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  active: boolean;

  @Column({
    type: 'enum',
    enum: ['open', 'close', 'away', 'busy'],
    enumName: 'userStatusEnum',
    default: 'open',
  })
  status: UserStatus;

  @Column({ type: 'varchar', length: 300, default: 'local' })
  provider: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  providerId: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @Field(() => RoleDto, { nullable: true })
  role: RoleEntity;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileDto;

  @OneToOne(() => BalanceEntity)
  @JoinColumn()
  @Field(() => BalanceDto)
  balance: BalanceDto;

  @OneToMany(() => EventEntity, (event) => event.to)
  @Field(() => [EventDto], { nullable: true })
  eventsTo?: EventDto[];

  @OneToMany(() => EventEntity, (event) => event.from)
  @Field(() => [EventDto], { nullable: true })
  eventsFrom?: EventDto[];

  @OneToMany(() => RequestEntity, (request) => request.to)
  @Field(() => [RequestDto])
  requestsTo: RequestDto[];

  @OneToMany(() => RequestEntity, (request) => request.from)
  @Field(() => [RequestDto])
  requestsFrom: RequestDto[];

  @OneToMany(
    () => SubscriptionEntity,
    (subscription) => subscription.subscriber,
  )
  @Field(() => [SubscriptionDto])
  subscriptions: SubscriptionDto[];

  @OneToMany(
    () => SubscriptionEntity,
    (subscription) => subscription.subscribedTo,
  )
  @Field(() => [SubscriptionDto])
  subscribers: SubscriptionDto[];

  @OneToMany(() => SessionEntity, (session) => session.mentee)
  @Field(() => [SessionDto])
  menteeSessions: SessionDto[];

  @OneToMany(() => SessionEntity, (session) => session.mentor)
  @Field(() => [SessionDto])
  mentorSessions: SessionDto[];

  @OneToMany(() => ObjectifEntity, (session) => session.mentee)
  @Field(() => [ObjectifDto])
  menteeObjectifs: ObjectifDto[];

  @OneToMany(() => ObjectifEntity, (session) => session.mentor)
  @Field(() => [ObjectifDto])
  mentorObjectifs: ObjectifDto[];

  //rooms that the user is joined
  @ManyToMany(() => RoomEntity, (room) => room.members)
  rooms: RoomEntity[];
  // Mentor create Quiz
  @OneToMany(() => QuizEntity, (quiz) => quiz.mentor)
  quizzes: QuizDto[];
  // Mentor related to QuizSolution
  @OneToMany(() => QuizSolutionEntity, (quizSolution) => quizSolution.mentor)
  quizSolutions: QuizSolutionDto[];
  // Mentee related to quiz
  @ManyToMany(() => QuizEntity, (quiz) => quiz.mentees)
  participate: QuizEntity[];
  // Mentee create an quizSolution
  @OneToMany(() => QuizSolutionEntity, (quizSolution) => quizSolution.mentee)
  responses: QuizSolutionDto[];

  @OneToMany(() => FileTagEntity, (fileTag) => fileTag.user)
  fileTags: FileTagDto[];

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileDto[];

  @ManyToMany(() => FileEntity, (file) => file.sharedWith)
  sharedFiles: FileEntity[];

  dtoClass = UserDto;
}
