import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';

@ArgsType()
export class RequestsPageOptionsDto extends PageOptionsDto {
  @Field(() => String, { nullable: true })
  mentor?: string;
  @Field(() => String, { nullable: true })
  mentee?: string;
  @Field(() => String, { nullable: true })
  status?: string;
  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;
}
