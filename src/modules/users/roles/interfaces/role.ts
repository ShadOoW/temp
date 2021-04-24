import { IPermission } from '@users/permissions/interfaces/permission';

export interface IRole {
  id: string;
  name: string;
  description?: string;
  permissions: IPermission[];
}
