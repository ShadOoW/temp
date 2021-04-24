import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { Permission } from '@users/permissions/entities/permission.entity';
import { User } from '@users/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  @Field(() => [Permission])
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  @Field(() => [User])
  users: User[];
}
