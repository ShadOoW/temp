import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/entities/permission.entity';

export async function rolesSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const permissionService = new PermissionsService(
    connection.getRepository(Permission),
  );
  const roleService = new RolesService(connection.getRepository(Role));
  const { permissions } = await permissionService.findAll();

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
  ].map((role) =>
    roleService.create(role).then((r) => (console.log('done ->', r.name), r)),
  );

  return await Promise.all(work);
}
