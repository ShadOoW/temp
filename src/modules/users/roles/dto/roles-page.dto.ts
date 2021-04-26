import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { RoleDto } from './role.dto';

@ObjectType()
export class RolesPageDto {
  @Field(() => [RoleDto])
  readonly data: RoleDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: RoleDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
