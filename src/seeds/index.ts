import { usersSeed } from './users';
import { permissionsSeed } from './permissions';

async function run() {
  if (process.argv) {
    if (process.argv.includes('users')) await usersSeed();
    if (process.argv.includes('permissions')) await permissionsSeed();
  }
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
