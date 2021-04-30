import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '@shared/interfaces/globalStatus';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/shared/abstract.dto';
import { SessionEntity } from '../entities/session.entity';

@ObjectType()
export class SessionDto extends AbstractDto {
  @Field(() => Date, { nullable: true })
  startDate: Date;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => UserDto, { nullable: true })
  mentee: UserDto;

  @Field(() => UserDto, { nullable: true })
  mentor: UserDto;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean, { nullable: true })
  isVideoCall?: boolean;

  @Field(() => Boolean, { nullable: true })
  isFromMentor?: boolean;

  @Field(() => String, { nullable: true })
  status?: Status;

  @Field(() => Int, { nullable: true })
  duration?: number;

  constructor(session: SessionEntity) {
    super(session);
    this.startDate = session.startDate;
    this.title = session.description;
    this.mentee = session.mentee;
    this.mentor = session.mentor;
    this.description = session.description;
    this.isVideoCall = session.isVideoCall;
    this.isFromMentor = session.isFromMentor;
    this.status = session.status;
    this.duration = session.duration;
  }
}
