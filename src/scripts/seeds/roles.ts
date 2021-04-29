/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
import { RoleEntity } from '@users/roles/entities/role.entity';
import { PermissionEntity } from '@users/permissions/entities/permission.entity';

export async function rolesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const permissionService = connection.getRepository(PermissionEntity);
  const roleService = connection.getRepository(RoleEntity);
  const permissions = await permissionService.find();
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
        //@ts-ignore
        .save(role)
        .then((r) => (console.log(`role ${index} done ->`, r.name), r))
        .catch(() => console.log(`role ${index} -> error`)),
    );

    await Promise.all(work);
    return await connection.close();
  }
}
