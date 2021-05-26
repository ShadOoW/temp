import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { FileDto } from '@documents/files/dto/file.dto';
import { FileTagEntity } from '../entities/file-tag.entity';
import { UserDto } from '@users/users/dto/user.dto';

@ObjectType()
export class FileTagDto extends AbstractDto {
  @Field(() => String)
  name: string;

  @Field(() => [FileDto], { nullable: true })
  files?: FileDto[];

  @Field(() => UserDto, { nullable: true })
  user?: UserDto;

  constructor(fileTag: FileTagEntity) {
    super(fileTag);
    console.log(fileTag);
    this.name = fileTag.name;
    this.files = fileTag.files;
    this.user = fileTag.user;
  }
}
