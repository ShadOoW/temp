import { IRequest } from '@users/requests/interfaces/request';
import { IRole } from '@users/roles/interfaces/role';

export interface IUser {
  id: string;
  username: string;
  email: string;
  active?: boolean;
  isAdmin?: boolean;
  role?: IRole;
  requestsTo?: IRequest[];
  requestsFrom?: IRequest[];
  profile?: any;
}

export enum UserStatus {
  open = 'open',
  away = 'away',
  close = 'close',
  busy = 'busy',
}
