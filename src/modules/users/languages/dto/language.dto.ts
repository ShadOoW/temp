import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { LanguageEntity } from '../entities/language.entity';

@ObjectType()
export class LanguageDto extends AbstractDto {
  @Field(() => String)
  name: string;
  constructor(language: LanguageEntity) {
    super(language);
    this.name = language.name;
  }
}
