import { AbstractEntity } from '@src/common/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { FileEntity } from '@documents/files/entities/file.entity';
import { FileTagDto } from '../dto/file-tag.dto';
import { UserEntity } from '@users/users/entities/user.entity';
import { FileDto } from '@documents/files/dto/file.dto';
import { UserDto } from '@users/users/dto/user.dto';

@Entity({ name: 'file_tags' })
export class FileTagEntity extends AbstractEntity<FileTagDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @ManyToMany(() => FileEntity)
  @JoinTable()
  files: FileDto[];

  @ManyToOne(() => UserEntity, (user) => user.fileTags)
  user: UserDto;

  dtoClass = FileTagDto;
}
