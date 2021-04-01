import { IRequest } from '../../requests/interfaces/request';
import { IRole } from '../../roles/interfaces/role';

export interface IUser {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  role?: IRole;
  requestsTo?: IRequest[];
  requestsFrom?: IRequest[];
}
