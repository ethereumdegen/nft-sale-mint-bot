import { DiskletFile, DiskletFolder } from './legacy';
/**
 * Navigates down to the file indicated by the path.
 */
export declare function locateFile(folder: DiskletFolder, path: string): DiskletFile;
/**
 * Navigates down to the sub-folder indicated by the path.
 */
export declare function locateFolder(folder: DiskletFolder, path: string): DiskletFolder;
declare type FileIterator<T> = (file: DiskletFile, name: string, parentFolder: DiskletFolder) => T | Promise<T>;
declare type FolderIterator<T> = (folder: DiskletFolder, name: string, parentFolder: DiskletFolder) => T | Promise<T>;
/**
 * Applies an async function to all the files in a folder.
 */
export declare function mapFiles<T>(folder: DiskletFolder, f: FileIterator<T>): Promise<T[]>;
/**
 * Applies an async function to all the sub-folders in a folder.
 */
export declare function mapFolders<T>(folder: DiskletFolder, f: FolderIterator<T>): Promise<T[]>;
/**
 * Recursively applies an async function to all the files in a folder tree.
 * The file names are expanded into paths, and the result is a flat array.
 */
export declare function mapAllFiles<T>(folder: DiskletFolder, f: FileIterator<T>): Promise<T[]>;
export {};
