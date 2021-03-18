import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  authorId: string;

  @Column({ type: 'boolean', default: () => false })
  isPublished: boolean;
}
