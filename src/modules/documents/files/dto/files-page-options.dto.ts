import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { FileStatus } from './file.interfaces';

@ArgsType()
export class FilesPageOptionsDto extends PageOptionsDto {
  @Field(() => String, { nullable: true })
  readonly status?: FileStatus;

  @Field(() => String, { nullable: true })
  readonly tags?: string;
}
