// @flow

export type ArrayLike<T> =
  | $ReadOnlyArray<T>
  | {
      +length: number,
      +[n: number]: T
    }

export interface DiskletListing {
  [path: string]: 'file' | 'folder';
}

export interface Disklet {
  // Like `rm -r path`:
  delete(path: string): Promise<mixed>;

  // Like `cat path`:
  getData(path: string): Promise<Uint8Array>;
  getText(path: string): Promise<string>;

  // Like `ls -l path`:
  list(path?: string): Promise<DiskletListing>;

  // Like `mkdir -p $(dirname path); echo data > path`:
  setData(path: string, data: ArrayLike<number>): Promise<mixed>;
  setText(path: string, text: string): Promise<mixed>;
}

type LogOperation =
  | 'delete'
  | 'get data'
  | 'get text'
  | 'list'
  | 'set data'
  | 'set text'

interface LogOptions {
  callback?: (path: string, operation: LogOperation) => mixed;
  verbose?: boolean;
}

interface MemoryStorage {
  [key: string]: string | Uint8Array;
}

// The Typescript DOM library isn't available on React Native,
// so work around that:
interface WebStorage {
  +length: number;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

// Storage backends:
declare export function makeLocalStorageDisklet(
  storage?: WebStorage,
  opts?: { prefix?: string }
): Disklet
declare export function makeMemoryDisklet(storage?: MemoryStorage): Disklet
declare export function makeNodeDisklet(path: string): Disklet
declare export function makeReactNativeDisklet(): Disklet

// Wrappers:
declare export function logDisklet(disklet: Disklet, opts?: LogOptions): Disklet
declare export function mergeDisklets(
  master: Disklet,
  fallback: Disklet
): Disklet
declare export function navigateDisklet(disklet: Disklet, path: string): Disklet

// Listing helpers:
declare export function deepList(
  disklet: Disklet,
  path?: string
): Promise<DiskletListing>
declare export function justFiles(listing: DiskletListing): string[]
declare export function justFolders(listing: DiskletListing): string[]

// legacy API ----------------------------------------------------------------

export interface DiskletFile {
  delete(): Promise<void>;
  getData(): Promise<Uint8Array>;
  getText(): Promise<string>;
  setData(data: ArrayLike<number>): Promise<void>;
  setText(text: string): Promise<void>;
}

export interface DiskletFolder {
  delete(): Promise<void>;
  file(name: string): DiskletFile;
  folder(name: string): DiskletFolder;
  listFiles(): Promise<string[]>;
  listFolders(): Promise<string[]>;
}

// Helper functions:

declare export function locateFile(
  folder: DiskletFolder,
  path: string
): DiskletFile
declare export function locateFolder(
  folder: DiskletFolder,
  path: string
): DiskletFolder

declare export function mapAllFiles(
  folder: DiskletFolder,
  callback: (
    file: DiskletFile,
    path: string,
    parentFolder: DiskletFolder
  ) => any
): Promise<any[]>

declare export function mapFiles(
  folder: DiskletFolder,
  callback: (file: DiskletFile, name: string, parent: DiskletFolder) => any
): Promise<any[]>

declare export function mapFolders(
  folder: DiskletFolder,
  callback: (folder: DiskletFolder, name: string, parent: DiskletFolder) => any
): Promise<any[]>

// DiskletFolder types:

interface LocalStorageOpts {
  prefix?: string;
}

type LoggedFolderOperations =
  | 'delete file'
  | 'delete folder'
  | 'get data'
  | 'get text'
  | 'list files'
  | 'list folders'
  | 'set data'
  | 'set text'

interface LoggedFolderOpts {
  callback?: (path: string, operation: LoggedFolderOperations) => void;
  verbose?: boolean;
}

declare export function makeLocalStorageFolder(
  storage?: Object,
  opts?: LocalStorageOpts
): DiskletFolder

declare export function makeLoggedFolder(
  folder: DiskletFolder,
  opts?: LoggedFolderOpts
): DiskletFolder

declare export function downgradeDisklet(disklet: Disklet): DiskletFolder
declare export function makeMemoryFolder(storage?: Object): DiskletFolder
declare export function makeNodeFolder(path: string): DiskletFolder
declare export function makeReactNativeFolder(): DiskletFolder
declare export function makeUnionFolder(
  master: DiskletFolder,
  fallback: DiskletFolder
): DiskletFolder
