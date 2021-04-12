import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input';
import { IsString, IsOptional } from 'class-validator';
import { Request } from '../entities/request.entity';
import { RequestStatus } from '../interfaces/requestStatus';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: RequestStatus;

  public static toEntity(inputs: Partial<UpdateRequestInput>) {
    const it = new Request();
    it.title = inputs.title;
    it.excerpt = inputs.excerpt;
    it.description = inputs.description;
    it.status = inputs.status;
    return it;
  }
}
