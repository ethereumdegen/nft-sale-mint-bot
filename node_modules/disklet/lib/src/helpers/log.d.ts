import { Disklet } from '../index';
declare type LogOperation = 'delete' | 'get data' | 'get text' | 'list' | 'set data' | 'set text';
interface LogOptions {
    callback?: (path: string, operation: LogOperation) => unknown;
    verbose?: boolean;
}
export declare function logDisklet(disklet: Disklet, opts?: LogOptions): Disklet;
export {};
