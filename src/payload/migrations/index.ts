import * as migration_20250316_184729 from './20250316_184729';
import * as migration_20250318_213941 from './20250318_213941';
import * as migration_20250318_214044 from './20250318_214044';
import * as migration_20250419_165441 from './20250419_165441';

export const migrations = [
  {
    up: migration_20250316_184729.up,
    down: migration_20250316_184729.down,
    name: '20250316_184729',
  },
  {
    up: migration_20250318_213941.up,
    down: migration_20250318_213941.down,
    name: '20250318_213941',
  },
  {
    up: migration_20250318_214044.up,
    down: migration_20250318_214044.down,
    name: '20250318_214044',
  },
  {
    up: migration_20250419_165441.up,
    down: migration_20250419_165441.down,
    name: '20250419_165441'
  },
];
