import { mapFiles, mapFolders } from './helpers'
import { DiskletFile, DiskletFolder } from './legacy'

function removeDuplicates(master: string[], fallback: string[]): string[] {
  const blacklist: { [name: string]: true } = {}
  const out: string[] = []
  master.forEach(item => {
    if (/\._x_$/.test(item)) {
      blacklist[item] = true
    } else {
      blacklist[item + '._x_'] = true
      out.push(item)
    }
  })

  fallback.forEach(item => {
    if (!blacklist[item + '._x_']) out.push(item)
  })

  return out
}

/**
 * A file within a unionFolder.
 */
class UnionFile {
  _master: DiskletFile
  _fallback: DiskletFile
  _whiteout: DiskletFile

  constructor(
    master: DiskletFile,
    fallback: DiskletFile,
    whiteout: DiskletFile
  ) {
    this._master = master
    this._fallback = fallback
    this._whiteout = whiteout
  }

  delete(): Promise<unknown> {
    return Promise.all([
      this._whiteout.setData([]),
      this._master.delete().catch(e => null)
    ])
  }

  getData(): Promise<Uint8Array> {
    return this._master.getData().catch(e =>
      this._whiteout.getData().then(
        data => {
          throw new Error('File has been deleted')
        },
        e => this._fallback.getData()
      )
    )
  }

  getText(): Promise<string> {
    return this._master.getText().catch(e =>
      this._whiteout.getData().then(
        data => {
          throw new Error('File has been deleted')
        },
        e => this._fallback.getText()
      )
    )
  }

  setData(data: ArrayLike<number>): Promise<unknown> {
    return this._master.setData(data)
  }

  setText(text: string): Promise<unknown> {
    return this._master.setText(text)
  }

  getPath(): string {
    throw new Error('Cannot call getPath on a Union Folder')
  }
}

/**
 * Reads and writes go to a master folder, but if a read fails,
 * we will also try the fallback folder.
 */
export class UnionFolder {
  _master: DiskletFolder
  _fallback: DiskletFolder

  constructor(master: DiskletFolder, fallback: DiskletFolder) {
    this._master = master
    this._fallback = fallback
  }

  delete(): Promise<unknown> {
    return Promise.all([
      mapFiles(this, file => file.delete()),
      mapFolders(this, folder => folder.delete())
    ]).then(() => undefined)
  }

  file(name: string): DiskletFile {
    return new UnionFile(
      this._master.file(name),
      this._fallback.file(name),
      this._master.file(name + '._x_')
    )
  }

  folder(name: string): DiskletFolder {
    return new UnionFolder(
      this._master.folder(name),
      this._fallback.folder(name)
    )
  }

  listFiles(): Promise<string[]> {
    return Promise.all([
      this._master.listFiles(),
      this._fallback.listFiles()
    ]).then(values => removeDuplicates(values[0], values[1]))
  }

  listFolders(): Promise<string[]> {
    return Promise.all([
      this._master.listFolders(),
      this._fallback.listFolders()
    ]).then(values => removeDuplicates(values[0], values[1]))
  }
}

export function makeUnionFolder(
  master: DiskletFolder,
  fallback: DiskletFolder
): DiskletFolder {
  return new UnionFolder(master, fallback)
}
