import { downgradeDisklet } from './downgrade'
import {
  locateFile,
  locateFolder,
  mapAllFiles,
  mapFiles,
  mapFolders
} from './helpers'
import { makeLoggedFolder } from './loggedFolder'
import { makeUnionFolder } from './unionFolder'

export {
  downgradeDisklet,
  locateFile,
  locateFolder,
  makeLoggedFolder,
  makeUnionFolder,
  mapAllFiles,
  mapFiles,
  mapFolders
}

// legacy API ----------------------------------------------------------------

export interface DiskletFile {
  delete(): Promise<unknown>
  getData(): Promise<Uint8Array>
  getText(): Promise<string>
  setData(data: ArrayLike<number>): Promise<unknown>
  setText(text: string): Promise<unknown>
}

export interface DiskletFolder {
  delete(): Promise<unknown>
  file(name: string): DiskletFile
  folder(name: string): DiskletFolder
  listFiles(): Promise<string[]>
  listFolders(): Promise<string[]>
}
