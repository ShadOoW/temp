import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  @Field(() => String)
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  videoConference?: boolean;

  @ManyToOne(() => User, (user) => user.menteeSessions)
  @Field(() => User)
  mentee: User;

  @ManyToOne(() => User, (user) => user.mentorSessions)
  @Field(() => User)
  mentor: User;
}
