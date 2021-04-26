import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { PermissionDto } from './permission.dto';

@ObjectType()
export class PermissionsPageDto {
  @Field(() => [PermissionDto])
  readonly data: PermissionDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: PermissionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
