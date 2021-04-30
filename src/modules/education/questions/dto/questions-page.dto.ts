import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { QuestionDto } from './question.dto';

@ObjectType()
export class QuestionsPageDto {
  @Field(() => [QuestionDto])
  readonly data: QuestionDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: QuestionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
