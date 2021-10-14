/* global Buffer */

import fs from 'fs'
import pathUtil from 'path'

import { folderizePath, normalizePath } from '../helpers/paths'
import { Disklet, DiskletListing } from '../index'

// Promise versions of node.js file operations: -----------------------------

function mkdir(path: string): Promise<unknown> {
  return new Promise((resolve, reject) =>
    fs.mkdir(path, undefined, err =>
      err != null && err.code !== 'EEXIST' ? reject(err) : resolve()
    )
  )
}

function rmdir(path: string): Promise<unknown> {
  return new Promise((resolve, reject) =>
    fs.rmdir(path, err => (err != null ? reject(err) : resolve()))
  )
}

function readdir(path: string): Promise<string[]> {
  return new Promise((resolve, reject) =>
    fs.readdir(path, (err, out) => (err != null ? reject(err) : resolve(out)))
  )
}

function unlink(path: string): Promise<unknown> {
  return new Promise((resolve, reject) =>
    fs.unlink(path, err => (err != null ? reject(err) : resolve()))
  )
}

class Queue {
  private _active: boolean

  callBackList: Array<(onEnd: () => void) => void>
  onEmpty?: () => void

  constructor() {
    this.callBackList = []
    this._active = false
  }

  next(): void {
    if (this._active) return
    const fn = this.callBackList.shift()
    if (fn == null) {
      if (this.onEmpty != null) {
        this.onEmpty()
        this.onEmpty = undefined
      }
      return
    }
    this._active = true
    fn(() => {
      this._active = false
      process.nextTick(() => this.next())
    })
  }
}

const writeFilePathQueue: { [id: string]: Queue } = {}

function writeFile(
  path: string,
  data: any,
  opts: fs.WriteFileOptions
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const currentTask = (onEnd: () => void): void => {
      fs.writeFile(path, data, opts, err => {
        onEnd()
        err != null ? reject(err) : resolve()
      })
    }
    if (writeFilePathQueue[path] == null) {
      writeFilePathQueue[path] = new Queue()
      writeFilePathQueue[path].onEmpty = () => {
        delete writeFilePathQueue[path]
      }
    }
    writeFilePathQueue[path].callBackList.push(currentTask)
    writeFilePathQueue[path].next()
  })
}

// Helpers: -----------------------------------------------------------------

/**
 * Recursively deletes a file or directory.
 */
function deepDelete(path: string): Promise<unknown> {
  return getType(path).then(type => {
    if (type === 'file') {
      return unlink(path)
    }
    if (type === 'folder') {
      return readdir(path)
        .then(names =>
          Promise.all(names.map(name => deepDelete(pathUtil.join(path, name))))
        )
        .then(() => rmdir(path))
    }
  })
}

/**
 * Recursively creates a directory.
 */
function deepMkdir(path: string): Promise<unknown> {
  return mkdir(path).catch(err => {
    if (err.code !== 'ENOENT') throw err
    return deepMkdir(pathUtil.dirname(path)).then(() => mkdir(path))
  })
}

/**
 * Writes a file, creating its directory if needed.
 */
function deepWriteFile(
  path: string,
  data: Buffer | string,
  opts: fs.WriteFileOptions
): Promise<unknown> {
  return writeFile(path, data, opts).catch(err => {
    if (err.code !== 'ENOENT') throw err
    return deepMkdir(pathUtil.dirname(path)).then(() =>
      writeFile(path, data, opts)
    )
  })
}

/**
 * Returns a path's type, or '' if anything goes wrong.
 */
function getType(path: string): Promise<'file' | 'folder' | ''> {
  return new Promise(resolve =>
    fs.stat(path, (err, out) => {
      if (err != null) resolve('')
      else if (out.isFile()) resolve('file')
      else if (out.isDirectory()) resolve('folder')
      else resolve('')
    })
  )
}

// --------------------------------------------------------------------------

export function makeNodeDisklet(path: string): Disklet {
  const root = pathUtil.resolve(path)
  function locate(path: string): string {
    return pathUtil.join(root, normalizePath(path))
  }

  return {
    delete(path: string): Promise<unknown> {
      return deepDelete(locate(path))
    },

    getData(path: string): Promise<Uint8Array> {
      return new Promise((resolve, reject) =>
        fs.readFile(locate(path), {}, (err, out) =>
          err != null ? reject(err) : resolve(out)
        )
      )
    },

    getText(path: string): Promise<string> {
      return new Promise((resolve, reject) =>
        fs.readFile(locate(path), 'utf8', (err, out) =>
          err != null ? reject(err) : resolve(out)
        )
      )
    },

    list(path: string = ''): Promise<DiskletListing> {
      const file = normalizePath(path)
      const nativePath = locate(path)

      return getType(nativePath).then(type => {
        const out: DiskletListing = {}

        if (type === 'file') {
          out[file] = 'file'
          return out
        }
        if (type === 'folder') {
          return readdir(nativePath).then(names =>
            Promise.all(
              names.map(name => getType(pathUtil.join(nativePath, name)))
            ).then(types => {
              const folder = folderizePath(file)
              for (let i = 0; i < names.length; ++i) {
                const type = types[i]
                if (type !== '') out[folder + names[i]] = type
              }
              return out
            })
          )
        }
        return out
      })
    },

    setData(path: string, data: ArrayLike<number>): Promise<unknown> {
      const flowHack: any = data
      return deepWriteFile(locate(path), Buffer.from(flowHack), {})
    },

    setText(path: string, text: string): Promise<unknown> {
      return deepWriteFile(locate(path), text, 'utf8')
    }
  }
}
