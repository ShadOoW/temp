import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { Status } from '@src/shared/interfaces/globalStatus';
import { UserDto } from '@users/users/dto/user.dto';
import { UserEntity } from '@users/users/entities/user.entity';
import { RequestEntity } from '../entities/request.entity';

@ObjectType()
export class RequestDto extends AbstractDto {
  @Field(() => String, { nullable: true })
  whyNeedCoaching: string;

  @Field(() => String, { nullable: true })
  expectations?: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;

  @Field(() => String, { nullable: true })
  status?: Status;

  @Field(() => UserDto, { nullable: true })
  mentor?: UserEntity;

  @Field(() => UserDto, { nullable: true })
  mentee?: UserEntity;

  constructor(request: RequestEntity) {
    super(request);
    this.whyNeedCoaching = request.title;
    this.expectations = request.description;
    this.proposition = request.proposition;
    this.message = request.excerpt;
    this.status = request.status;
    this.mentor = request.to;
    this.mentee = request.from;
  }
}
