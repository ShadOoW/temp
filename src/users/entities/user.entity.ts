import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Request } from '../../requests/entities/request.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Session } from '../../sessions/entities/session.entity';

@ObjectType()
@Entity({ name: 'users' })
@Unique(['email', 'username'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 300, default: 'local' })
  @Field(() => String, { nullable: true })
  provider: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  providerId: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, { nullable: true })
  isAdmin: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  @Field(() => Role, { nullable: true })
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Field(() => Profile)
  profile: Profile;

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
}
