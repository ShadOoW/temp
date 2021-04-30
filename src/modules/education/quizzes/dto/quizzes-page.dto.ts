import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { QuizDto } from './quiz.dto';

@ObjectType()
export class QuizzesPageDto {
  @Field(() => [QuizDto])
  readonly data: QuizDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: QuizDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
