import { DiskletFile, DiskletFolder } from './legacy'

type LogOperation =
  | 'delete file'
  | 'delete folder'
  | 'get data'
  | 'get text'
  | 'list files'
  | 'list folders'
  | 'set data'
  | 'set text'

interface LogOptions {
  callback?: (path: string, operation: LogOperation) => unknown
  verbose?: boolean
}

function logConsole(path: string, operation: string): void {
  console.log(`${operation} "${path}"`)
}

function log(path: string, operation: LogOperation, opts: LogOptions): void {
  const { callback = logConsole, verbose = false } = opts
  if (verbose || /set|delete/.test(operation)) {
    callback(path, operation)
  }
}

class LoggedFile {
  _file: DiskletFile
  _opts: LogOptions
  _path: string

  constructor(file: DiskletFile, path: string, opts: LogOptions) {
    this._file = file
    this._path = path
    this._opts = opts
  }

  delete(): Promise<unknown> {
    log(this._path, 'delete file', this._opts)
    return this._file.delete()
  }

  getData(): Promise<Uint8Array> {
    log(this._path, 'get data', this._opts)
    return this._file.getData()
  }

  getText(): Promise<string> {
    log(this._path, 'get text', this._opts)
    return this._file.getText()
  }

  setData(data: ArrayLike<number>): Promise<unknown> {
    log(this._path, 'set data', this._opts)
    return this._file.setData(data)
  }

  setText(text: string): Promise<unknown> {
    log(this._path, 'set text', this._opts)
    return this._file.setText(text)
  }

  getPath(): string {
    return this._path
  }
}

class LoggedFolder {
  _folder: DiskletFolder
  _opts: LogOptions
  _path: string

  constructor(folder: DiskletFolder, path: string, opts: LogOptions) {
    this._folder = folder
    this._path = path
    this._opts = opts
  }

  delete(): Promise<unknown> {
    log(this._path, 'delete folder', this._opts)
    return this._folder.delete()
  }

  file(name: string): DiskletFile {
    return new LoggedFile(
      this._folder.file(name),
      this._path + name,
      this._opts
    )
  }

  folder(name: string): DiskletFolder {
    return new LoggedFolder(
      this._folder.folder(name),
      this._path + name + '/',
      this._opts
    )
  }

  listFiles(): Promise<string[]> {
    log(this._path, 'list files', this._opts)
    return this._folder.listFiles()
  }

  listFolders(): Promise<string[]> {
    log(this._path, 'list folders', this._opts)
    return this._folder.listFolders()
  }
}

export function makeLoggedFolder(
  folder: DiskletFolder,
  opts: LogOptions = {}
): DiskletFolder {
  return new LoggedFolder(folder, '', opts)
}
