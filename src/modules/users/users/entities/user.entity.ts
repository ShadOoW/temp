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
import { ObjectType, Field } from '@nestjs/graphql';
// import { BaseEntity } from '@shared/base.entity';
import { Role } from '@users/roles/entities/role.entity';
import { Request } from '@users/requests/entities/request.entity';
import { Profile } from '@users/profiles/entities/profile.entity';
import { Subscription } from '@users/subscriptions/entities/subscription.entity';
import { Session } from '@education/sessions/entities/session.entity';
import { UserStatus } from '../interfaces/user';
import { RoomEntity } from '@src/modules/messaging/chat/entities/room.entity';
import { Event } from '@src/modules/events/events/entities/event.entity';
import { Balance } from '@gamification/balances/entities/balance.entity';
import { Question } from '@education/questions/entities/question.entity';
import { Quiz } from '@education/quizzes/entities/quiz.entity';
import { Evaluation } from '@education/evaluations/entities/evaluation.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserDto } from '../dto/user.dto';
// import { AbstractDto } from '@src/common/dto/abstract.dto';

@ObjectType()
@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ type: 'varchar', length: 300 })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  username?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  password: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { nullable: true })
  active: boolean;

  @Column({
    type: 'enum',
    enum: ['open', 'close', 'away', 'busy'],
    enumName: 'userStatusEnum',
    default: 'close',
  })
  @Field(() => String, { nullable: true })
  status?: UserStatus;

  @Column({ type: 'varchar', length: 300, default: 'local' })
  @Field(() => String, { nullable: true })
  provider: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  providerId: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  @Field(() => Role, { nullable: true })
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Field(() => Profile)
  profile: Profile;

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

  @OneToMany(() => Request, (request) => request.to)
  @Field(() => [Request])
  requestsTo: Request[];

  @OneToMany(() => Request, (request) => request.from)
  @Field(() => [Request])
  requestsFrom: Request[];

  @OneToMany(() => Subscription, (subscription) => subscription.subscriber)
  @Field(() => [Subscription])
  subscriptions: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.subscribedTo)
  @Field(() => [Subscription])
  subscribers: Subscription[];

  @OneToMany(() => Session, (session) => session.mentee)
  @Field(() => [Session])
  menteeSessions: Session[];

  @OneToMany(() => Session, (session) => session.mentor)
  @Field(() => [Session])
  mentorSessions: Session[];

  //rooms that the user is joined
  @ManyToMany(() => RoomEntity, (room) => room.members)
  rooms: RoomEntity[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];

  dtoClass = UserDto;
}
