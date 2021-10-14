import { DiskletFile, DiskletFolder } from './legacy';
/**
 * Reads and writes go to a master folder, but if a read fails,
 * we will also try the fallback folder.
 */
export declare class UnionFolder {
    _master: DiskletFolder;
    _fallback: DiskletFolder;
    constructor(master: DiskletFolder, fallback: DiskletFolder);
    delete(): Promise<unknown>;
    file(name: string): DiskletFile;
    folder(name: string): DiskletFolder;
    listFiles(): Promise<string[]>;
    listFolders(): Promise<string[]>;
}
export declare function makeUnionFolder(master: DiskletFolder, fallback: DiskletFolder): DiskletFolder;
