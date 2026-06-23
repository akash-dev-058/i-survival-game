import Dexie, { Table } from 'dexie';
import { SaveData } from '@/types/SaveData';

/** Dexie database definition for save slots */
export class GameDatabase extends Dexie {
  saves!: Table<SaveData, number>;

  constructor() {
    super('SurvivalCoreDB');
    this.version(1).stores({
      saves: '++id, timestamp, version'
    });
  }
}

export const db = new GameDatabase();
