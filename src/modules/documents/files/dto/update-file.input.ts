import { CreateFileInput } from './create-file.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Relationship } from '@src/interfaces/relationship';
import { FileStatus } from './file.interfaces';

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String)
  @IsString()
  status: FileStatus;

  @Field(() => [Relationship], { nullable: true })
  @IsArray()
  @IsOptional()
  tags?: Relationship[];

  @Field(() => [Relationship], { nullable: true })
  @IsArray()
  @IsOptional()
  sharedWith?: Relationship[];
}
