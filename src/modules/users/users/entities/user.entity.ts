import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field } from '@nestjs/graphql';
import { RoleEntity } from '@users/roles/entities/role.entity';
import { RequestEntity } from '@users/requests/entities/request.entity';
import { ProfileEntity } from '@users/profiles/entities/profile.entity';
import { SubscriptionEntity } from '@users/subscriptions/entities/subscription.entity';
import { SessionEntity } from '@education/sessions/entities/session.entity';
import { UserStatus } from '../interfaces/user';
import { RoomEntity } from '@src/modules/messaging/chat/entities/room.entity';
import { Event } from '@src/modules/events/events/entities/event.entity';
import { Balance } from '@gamification/balances/entities/balance.entity';
import { QuestionEntity } from '@education/questions/entities/question.entity';
import { Quiz } from '@education/quizzes/entities/quiz.entity';
import { Evaluation } from '@education/evaluations/entities/evaluation.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { ProfileDto } from '../../profiles/dto/profile.dto';
import { SubscriptionDto } from '../../subscriptions/dto/subscription.dto';
import { RequestDto } from '../../requests/dto/request.dto';
import { SessionDto } from '@src/modules/education/sessions/dto/session.dto';

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
    default: 'close',
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

  @OneToOne(() => Balance)
  @JoinColumn()
  @Field(() => Balance)
  balance: Balance;

  @OneToMany(() => Event, (event) => event.to)
  @Field(() => [Event], { nullable: true })
  eventsTo?: Event[];

  @OneToMany(() => Event, (event) => event.from)
  @Field(() => [Event], { nullable: true })
  eventsFrom?: Event[];

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

  //rooms that the user is joined
  @ManyToMany(() => RoomEntity, (room) => room.members)
  rooms: RoomEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.user)
  questions: QuestionEntity[];

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];

  dtoClass = UserDto;
}
