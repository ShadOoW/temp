import { IPermission } from '../../permissions/interfaces/permission';

export interface IRole {
  id: string;
  name: string;
  description?: string;
  permissions: IPermission[];
}
