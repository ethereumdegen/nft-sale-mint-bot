import { DiskletFolder } from './legacy';
declare type LogOperation = 'delete file' | 'delete folder' | 'get data' | 'get text' | 'list files' | 'list folders' | 'set data' | 'set text';
interface LogOptions {
    callback?: (path: string, operation: LogOperation) => unknown;
    verbose?: boolean;
}
export declare function makeLoggedFolder(folder: DiskletFolder, opts?: LogOptions): DiskletFolder;
export {};
