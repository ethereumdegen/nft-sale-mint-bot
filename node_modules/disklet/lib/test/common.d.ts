import { Disklet } from '../src/index';
export interface DiskletTests {
    [name: string]: (disklet: Disklet) => Promise<unknown>;
}
export declare function createFiles(disklet: Disklet): Promise<void>;
export declare function sortStrings(list: string[]): string[];
export declare function testDisklet(disklet: Disklet): Promise<void>;
export declare const tests: DiskletTests;
