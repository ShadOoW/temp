import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';
import { Role } from '../../roles/entities/role.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  lastName: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  password: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  phone?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  picture?: string;

  @Column({ type: 'varchar', length: 300, default: 'local' })
  @Field(() => String)
  provider: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String)
  providerId: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isAdmin: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  @Field(() => Role)
  role: Role;
}
