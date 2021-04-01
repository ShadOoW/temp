import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { Request } from '../entities/request.entity';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateRequestInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  excerpt: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  description: string;

  @Field(() => String)
  @IsUUID()
  from: User;

  @Field(() => String)
  @IsUUID()
  to: User;

  public static toEntity(inputs: Partial<CreateRequestInput>) {
    const it = new Request();
    it.id = inputs.id;
    it.title = inputs.title;
    it.excerpt = inputs.excerpt;
    it.description = inputs.description;
    it.to = inputs.to;
    it.from = inputs.from;
    return it;
  }
}
