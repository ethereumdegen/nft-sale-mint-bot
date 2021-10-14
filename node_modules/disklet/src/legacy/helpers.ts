import { DiskletFile, DiskletFolder } from './legacy'

/**
 * Interprets a path as a series of folder lookups,
 * handling special components like `.` and `..`.
 */
function followPath(folder: DiskletFolder, parts: string[]): DiskletFolder {
  let i = 0 // Read index
  let j = 0 // Write index

  // Shift down good elements, dropping bad ones:
  while (i < parts.length) {
    const part = parts[i++]
    if (part === '..') j--
    else if (part !== '.' && part !== '') parts[j++] = part

    if (j < 0) throw new Error('Path would escape folder')
  }

  // Navigate the folder:
  for (i = 0; i < j; ++i) {
    folder = folder.folder(parts[i])
  }
  return folder
}

/**
 * Navigates down to the file indicated by the path.
 */
export function locateFile(folder: DiskletFolder, path: string): DiskletFile {
  const parts = path.split('/')
  const filename = parts.pop()
  if (filename == null) throw new Error('Empty path')
  return followPath(folder, parts).file(filename)
}

/**
 * Navigates down to the sub-folder indicated by the path.
 */
export function locateFolder(
  folder: DiskletFolder,
  path: string
): DiskletFolder {
  const parts = path.split('/')
  return followPath(folder, parts)
}

type FileIterator<T> = (
  file: DiskletFile,
  name: string,
  parentFolder: DiskletFolder
) => T | Promise<T>

type FolderIterator<T> = (
  folder: DiskletFolder,
  name: string,
  parentFolder: DiskletFolder
) => T | Promise<T>

/**
 * Applies an async function to all the files in a folder.
 */
export function mapFiles<T>(
  folder: DiskletFolder,
  f: FileIterator<T>
): Promise<T[]> {
  return folder
    .listFiles()
    .then(names =>
      Promise.all(names.map(name => f(folder.file(name), name, folder)))
    )
}

/**
 * Applies an async function to all the sub-folders in a folder.
 */
export function mapFolders<T>(
  folder: DiskletFolder,
  f: FolderIterator<T>
): Promise<T[]> {
  return folder
    .listFolders()
    .then(names =>
      Promise.all(names.map(name => f(folder.folder(name), name, folder)))
    )
}

/**
 * Recursively applies an async function to all the files in a folder tree.
 * The file names are expanded into paths, and the result is a flat array.
 */
export function mapAllFiles<T>(
  folder: DiskletFolder,
  f: FileIterator<T>
): Promise<T[]> {
  function recurse(
    folder: DiskletFolder,
    f: FileIterator<T>,
    prefix: string
  ): Promise<T[]> {
    return Promise.all([
      mapFiles(folder, (file, name) => f(file, prefix + name, folder)),
      mapFolders(folder, (folder, name) =>
        recurse(folder, f, prefix + name + '/')
      )
    ]).then(([files, folders]) => files.concat(...folders))
  }

  return recurse(folder, f, '')
}
