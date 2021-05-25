import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { FileTagDto } from '../../file-tags/dto/file-tag.dto';
import { FileEntity } from '../entities/file.entity';

@ObjectType()
export class FileDto extends AbstractDto {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => String, { nullable: true })
  link: string;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => [FileTagDto], { nullable: true })
  tags?: FileTagDto[];

  @Field(() => UserDto, { nullable: true })
  user?: UserDto;

  @Field(() => [UserDto], { nullable: true })
  sharedWith?: UserDto[];

  constructor(file: FileEntity) {
    super(file);
    this.name = file.name;
    this.type = file.type;
    this.link = file.link;
    this.status = file.status;
    this.tags = file.tags;
    this.user = file.user;
    this.sharedWith = file.sharedWith;
  }
}
