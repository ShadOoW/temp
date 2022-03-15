import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { LanguageDto } from '../dto/language.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@ObjectType()
@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity<LanguageDto> {
  @Field(() => String)
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  dtoClass = LanguageDto;
}
