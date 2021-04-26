import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PermissionEntity } from '@users/permissions/entities/permission.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { RoleDto } from '../dto/role.dto';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEntity<RoleDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  dtoClass = RoleDto;
}
