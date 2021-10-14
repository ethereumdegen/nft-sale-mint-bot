import { Disklet } from '../index';
export interface MemoryStorage {
    [key: string]: string | Uint8Array;
}
/**
 * Emulates a filesystem in memory.
 */
export declare function makeMemoryDisklet(storage?: MemoryStorage): Disklet;
