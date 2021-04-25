import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { Status } from '@shared/interfaces/globalStatus';

@ObjectType()
@Entity({ name: 'requests' })
export class Request extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  excerpt: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;

  @Column({
    type: 'enum',
    enum: ['created', 'updated', 'accepted', 'refused'],
    enumName: 'statusEnum',
    default: 'created',
  })
  @Field(() => String, { nullable: true })
  status?: Status;

  @ManyToOne(() => UserEntity, (user) => user.requestsTo)
  @Field(() => UserEntity, { nullable: true })
  to?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.requestsFrom)
  @Field(() => UserEntity)
  from: UserEntity;
}
