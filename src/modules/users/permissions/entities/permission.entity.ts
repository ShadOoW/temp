import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { PermissionDto } from '../dto/permission.dto';

@Entity({ name: 'permissions' })
export class PermissionEntity extends AbstractEntity<PermissionDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  dtoClass = PermissionDto;
}
