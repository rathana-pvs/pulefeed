import * as migration_20260624_085723_init from './20260624_085723_init';

export const migrations = [
  {
    up: migration_20260624_085723_init.up,
    down: migration_20260624_085723_init.down,
    name: '20260624_085723_init'
  },
];
