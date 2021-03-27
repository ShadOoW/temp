import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  picture?: string;
  isAdmin?: boolean;
  role?: Role;
  permissions?: Permission[];
}
