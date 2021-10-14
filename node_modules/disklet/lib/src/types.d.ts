export interface DiskletListing {
    [path: string]: 'file' | 'folder';
}
export interface Disklet {
    delete(path: string): Promise<unknown>;
    getData(path: string): Promise<Uint8Array>;
    getText(path: string): Promise<string>;
    list(path?: string): Promise<DiskletListing>;
    setData(path: string, data: ArrayLike<number>): Promise<unknown>;
    setText(path: string, text: string): Promise<unknown>;
}
