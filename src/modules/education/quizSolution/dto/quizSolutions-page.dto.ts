import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { QuizSolutionDto } from './quizSolution.dto';

@ObjectType()
export class QuizSolutionsPageDto {
  @Field(() => [QuizSolutionDto])
  readonly data: QuizSolutionDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: QuizSolutionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
