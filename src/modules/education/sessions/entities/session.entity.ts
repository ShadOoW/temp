import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { Status } from '@shared/interfaces/globalStatus';

@ObjectType()
@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ type: 'timestamptz' })
  @Field(() => Date)
  startDate: Date;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.menteeSessions)
  @Field(() => UserEntity)
  mentee: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.mentorSessions)
  @Field(() => UserEntity)
  mentor: UserEntity;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isVideoCall?: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isFromMentor?: boolean;

  @Column({
    type: 'enum',
    enum: ['created', 'updated', 'accepted', 'refused'],
    enumName: 'sessionEnum',
    default: 'created',
  })
  @Field(() => String, { nullable: true })
  status?: Status;

  @Field(() => Int)
  @Column({ type: 'int', nullable: true })
  duration?: number;
}
