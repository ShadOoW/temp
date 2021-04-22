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
import { BaseEntity } from '../../shared/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Request } from '../../requests/entities/request.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Session } from '../../sessions/entities/session.entity';
import { UserStatus } from '../interfaces/user';
import { RoomEntity } from '../../chat/entities/room.entity';
import { Event } from '../../events/entities/event.entity';
import { Balance } from '../../balances/entities/balance.entity';

@ObjectType()
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
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
}
