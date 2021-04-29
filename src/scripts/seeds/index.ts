import { usersSeed } from './users';
import { permissionsSeed } from './permissions';
import { rolesSeed } from './roles';
// import { requestsSeed } from './requests';
import { domainsSeed } from './domains';
// import { chatSeed } from './chat';
import { pointsSeed } from './points';
import { badgesSeed } from './badges';

async function run() {
  if (process.argv) {
    if (process.argv.includes('domains') || process.argv.includes('all'))
      await domainsSeed();
    if (process.argv.includes('permissions') || process.argv.includes('all'))
      await permissionsSeed();
    if (process.argv.includes('roles') || process.argv.includes('all'))
      await rolesSeed();
    if (process.argv.includes('users') || process.argv.includes('all'))
      await usersSeed();
    // if (process.argv.includes('requests') || process.argv.includes('all'))
    //   await requestsSeed();
    // if (process.argv.includes('chat') || process.argv.includes('all'))
    //   await chatSeed();
    if (process.argv.includes('points') || process.argv.includes('all'))
      await pointsSeed();
    if (process.argv.includes('badges') || process.argv.includes('all'))
      await badgesSeed();
  }
}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
