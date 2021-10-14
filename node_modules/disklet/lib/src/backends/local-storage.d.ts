import { Disklet } from '../index';
export interface WebStorage {
    readonly length: number;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}
/**
 * Emulates a filesystem in memory.
 */
export declare function makeLocalStorageDisklet(storage?: WebStorage, opts?: {
    prefix?: string;
}): Disklet;
