import { ArgsType } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';

@ArgsType()
export class QuizzesPageOptionsDto extends PageOptionsDto {
  mentee?: string;
  mentor?: string;
}
