import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { FileTagEntity } from '@documents/file-tags/entities/file-tag.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { FileStatus } from '../dto/file.interfaces';
import { AbstractEntity } from '@src/common/abstract.entity';
import { FileDto } from '../dto/file.dto';
import { FileTagDto } from '../../file-tags/dto/file-tag.dto';

@Entity({ name: 'files' })
export class FileEntity extends AbstractEntity<FileDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  type: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  link: string;

  @Column({
    type: 'enum',
    enum: ['created', 'updated', 'deleted', 'shared'],
    enumName: 'fileStatusEnum',
    default: 'created',
  })
  status?: FileStatus;

  @ManyToMany(() => FileTagEntity, (fileTag) => fileTag.files)
  @JoinTable()
  tags: FileTagDto[];

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.sharedFiles)
  @JoinTable()
  sharedWith: UserEntity[];

  dtoClass = FileDto;
}
