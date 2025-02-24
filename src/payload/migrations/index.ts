import * as migration_20250224_201938 from './20250224_201938';
import * as migration_20250224_215726 from './20250224_215726';

export const migrations = [
  {
    up: migration_20250224_201938.up,
    down: migration_20250224_201938.down,
    name: '20250224_201938',
  },
  {
    up: migration_20250224_215726.up,
    down: migration_20250224_215726.down,
    name: '20250224_215726'
  },
];
