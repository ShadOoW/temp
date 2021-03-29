import { IRole } from '../../roles/interfaces/role';

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  picture?: string;
  isAdmin?: boolean;
  role?: IRole;
}
