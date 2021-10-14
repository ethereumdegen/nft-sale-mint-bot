import { makeNodeDisklet } from './backends/dummy';
import { makeLocalStorageDisklet, WebStorage } from './backends/local-storage';
import { makeMemoryDisklet, MemoryStorage } from './backends/memory';
import { makeReactNativeDisklet } from './backends/react-native';
import { DiskletFolder } from './legacy/legacy';
export * from './helpers/helpers';
export * from './legacy/legacy';
export * from './types';
export { makeLocalStorageDisklet, makeMemoryDisklet, makeNodeDisklet, makeReactNativeDisklet };
export declare function makeLocalStorageFolder(storage: WebStorage, opts?: {
    prefix?: string;
}): DiskletFolder;
export declare function makeMemoryFolder(storage?: MemoryStorage): DiskletFolder;
export declare function makeNodeFolder(path: string): DiskletFolder;
export declare function makeReactNativeFolder(): DiskletFolder;
