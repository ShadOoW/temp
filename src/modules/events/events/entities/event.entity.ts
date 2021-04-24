import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { User } from '@users/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  @Field(() => String)
  module: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 300, nullable: false })
  command: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  @Field(() => String)
  sourceId: string;

  @ManyToOne(() => User, (user) => user.eventsFrom)
  @Field(() => User)
  from?: User;

  @ManyToOne(() => User, (user) => user.eventsTo)
  @Field(() => User, { nullable: true })
  to?: User;

  @Column({ type: 'json', nullable: true })
  @Field(() => String)
  payload?: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  read?: boolean;
}
