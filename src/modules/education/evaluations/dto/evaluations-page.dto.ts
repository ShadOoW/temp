import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { EvaluationDto } from './evaluation.dto';

@ObjectType()
export class EvaluationsPageDto {
  @Field(() => [EvaluationDto])
  readonly data: EvaluationDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: EvaluationDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
