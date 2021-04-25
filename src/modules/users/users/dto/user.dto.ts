// import { RoleType } from '@src/common/constants/role-type';
import { AbstractDto } from '@src/common/dto/Abstract.dto';
import { UserEntity } from '@users/users/entities/user.entity';

export class UserDto extends AbstractDto {
  email: string;

  username: string;

  password: string;

  status: string;

  provider: string;

  providerId: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.status = user.status;
    this.provider = user.provider;
    this.providerId = user.providerId;
  }
}
