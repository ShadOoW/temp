import { ArgsType } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';

@ArgsType()
export class FileTagsPageOptionsDto extends PageOptionsDto {}