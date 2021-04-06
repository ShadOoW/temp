import { usersSeed } from './users';
import { permissionsSeed } from './permissions';
import { rolesSeed } from './roles';

async function run() {
  if (process.argv) {
    if (process.argv.includes('permissions') || process.argv.includes('all'))
      await permissionsSeed();
    if (process.argv.includes('roles') || process.argv.includes('all'))
      await rolesSeed();
    if (process.argv.includes('users') || process.argv.includes('all'))
      await usersSeed();
  }
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
