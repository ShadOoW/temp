import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class UsersPageDto {
  @Field(() => [UserDto])
  readonly data: UserDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: UserDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
