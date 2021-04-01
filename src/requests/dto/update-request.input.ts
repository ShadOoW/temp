import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input';
import { IsString, IsOptional } from 'class-validator';
import { Request } from '../entities/request.entity';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  excerpt: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  public static toEntity(inputs: Partial<UpdateRequestInput>) {
    const it = new Request();
    it.id = inputs.id;
    it.title = inputs.title;
    it.excerpt = inputs.excerpt;
    it.description = inputs.description;
    return it;
  }
}
