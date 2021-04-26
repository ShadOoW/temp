import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { RolesService } from '@users/roles/roles.service';
import { RoleEntity } from '@users/roles/entities/role.entity';
import { PermissionsService } from '@users/permissions/permissions.service';
import { PermissionEntity } from '@users/permissions/entities/permission.entity';

export async function rolesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const permissionService = new PermissionsService(
    connection.getRepository(PermissionEntity),
  );
  const roleService = new RolesService(connection.getRepository(RoleEntity));
  const { permissions } = await permissionService.findAll();
  if (permissions.length) {
    const work = [
      {
        name: 'mentor',
        description: 'mentor role',
        permissions: permissions.filter((permission) => {
          return (
            permission.name === 'manage:subscription' ||
            permission.name === 'manage:profile' ||
            permission.name === 'manage:request' ||
            permission.name === 'manage:session'
          );
        }),
      },
      {
        name: 'mentee',
        description: 'mentor role',
        permissions: permissions.filter((permission) => {
          return (
            permission.name === 'manage:subscription' ||
            permission.name === 'manage:profile' ||
            permission.name === 'manage:request' ||
            permission.name === 'manage:session'
          );
        }),
      },
    ].map((role, index) =>
      roleService
        .create(role)
        .then((r) => (console.log(`role ${index} done ->`, r.name), r))
        .catch(() => console.log(`role ${index} -> error`)),
    );

    await Promise.all(work);
    return await connection.close();
  }
}
