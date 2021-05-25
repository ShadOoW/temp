import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { ObjectifEntity } from '../entities/objectif.entity';

@ObjectType()
export class ObjectifDto extends AbstractDto {
  @Field(() => Date, { nullable: true })
  dueDate: Date;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => UserDto, { nullable: true })
  mentee: UserDto;

  @Field(() => UserDto, { nullable: true })
  mentor: UserDto;

  @Field(() => Int, { nullable: true })
  progression?: number;

  constructor(objectif: ObjectifEntity) {
    super(objectif);
    this.dueDate = objectif.dueDate;
    this.title = objectif.title;
    this.mentee = objectif.mentee;
    this.mentor = objectif.mentor;
    this.progression = objectif.progression;
  }
}
