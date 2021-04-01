import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  Unique,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';
import { Role } from '../../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Request } from '../../requests/entities/request.entity';

@ObjectType()
@Entity({ name: 'users' })
@Unique(['email', 'username', 'phone'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  @Field(() => String, { nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String, { nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const hash = this.password ? await bcrypt.hash(this.password, 10) : '';
    this.password = hash;
  }

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  picture: string;

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

  @OneToMany(() => Request, (request) => request.to)
  @Field(() => [Request])
  requestsTo: Request[];

  @OneToMany(() => Request, (request) => request.from)
  @Field(() => [Request])
  requestsFrom: Request[];
}
