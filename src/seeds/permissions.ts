import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/entities/permission.entity';

export async function permissionsSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const userService = new PermissionsService(
    connection.getRepository(Permission),
  );

  const work = [
    // Permission permissions
    {
      name: 'manage:permisssion',
      description: 'manage all permisssion permisssions',
    },
    {
      name: 'create:permisssion',
      description: 'permisssion to create new permisssion',
    },
    {
      name: 'update:permisssion',
      description: 'permisssion to update permisssion',
    },
    {
      name: 'read:permisssion',
      description: 'permisssion to read permisssion',
    },
    {
      name: 'delete:permisssion',
      description: 'permisssion to delete permisssion',
    },
    // Role permissions
    {
      name: 'manage:role',
      description: 'manage all role permisssions',
    },
    {
      name: 'create:role',
      description: 'permisssion to create new role',
    },
    {
      name: 'update:role',
      description: 'permisssion to update role',
    },
    {
      name: 'read:role',
      description: 'permisssion to read role',
    },
    {
      name: 'delete:role',
      description: 'permisssion to delete role',
    },
    // User permissions
    {
      name: 'manage:user',
      description: 'manage all user permisssions',
    },
    {
      name: 'create:user',
      description: 'permisssion to create new user',
    },
    {
      name: 'update:user',
      description: 'permisssion to update user',
    },
    {
      name: 'read:user',
      description: 'permisssion to read user',
    },
    {
      name: 'delete:user',
      description: 'permisssion to delete user',
    },
    // Profile permissions
    {
      name: 'manage:profile',
      description: 'manage all profile permisssions',
    },
    {
      name: 'update:profile',
      description: 'permisssion to update profile',
    },
    {
      name: 'read:profile',
      description: 'permisssion to read profile',
    },
    // Subscription permissions
    {
      name: 'manage:subscription',
      description: 'manage all subscription permisssions',
    },
    {
      name: 'create:subscription',
      description: 'permisssion to create subscription',
    },
    {
      name: 'read:subscription',
      description: 'permisssion to read profile',
    },
    // Request permissions
    {
      name: 'manage:request',
      description: 'manage all request permisssions',
    },
    {
      name: 'create:request',
      description: 'permisssion to create new request',
    },
    {
      name: 'update:request',
      description: 'permisssion to update request',
    },
    {
      name: 'read:request',
      description: 'permisssion to read request',
    },
    {
      name: 'delete:request',
      description: 'permisssion to delete request',
    },
    // Session permissions
    {
      name: 'manage:session',
      description: 'manage all session permisssions',
    },
    {
      name: 'create:session',
      description: 'permisssion to create new session',
    },
    {
      name: 'update:session',
      description: 'permisssion to update session',
    },
    {
      name: 'read:session',
      description: 'permisssion to read session',
    },
    {
      name: 'delete:session',
      description: 'permisssion to delete session',
    },
  ].map((permission) =>
    userService
      .create(permission)
      .then((r) => (console.log('done ->', r.name), r)),
  );

  return await Promise.all(work);
}
