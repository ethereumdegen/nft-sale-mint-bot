import { folderizePath, normalizePath } from '../helpers/paths'
import { Disklet, DiskletListing } from '../index'

export interface MemoryStorage {
  [key: string]: string | Uint8Array
}

/**
 * Emulates a filesystem in memory.
 */
export function makeMemoryDisklet(storage: MemoryStorage = {}): Disklet {
  return {
    delete(path: string): Promise<unknown> {
      const file = normalizePath(path)

      // Try deleteing as a file:
      if (storage['/' + file] != null) delete storage['/' + file]

      // Try deleting as a folder:
      const folder = folderizePath(file)
      for (const key of Object.keys(storage)) {
        if (key.indexOf('/' + folder) === 0) delete storage[key]
      }
      return Promise.resolve()
    },

    getData(path: string): Promise<Uint8Array> {
      const file = normalizePath(path)
      const item = storage['/' + file]
      if (item == null) {
        return Promise.reject(new Error(`Cannot load "${file}"`))
      }
      if (typeof item === 'string') {
        return Promise.reject(new Error(`"${file}" is a text file.`))
      }
      return Promise.resolve(item)
    },

    getText(path: string): Promise<string> {
      const file = normalizePath(path)
      const item = storage['/' + file]
      if (item == null) {
        return Promise.reject(new Error(`Cannot load "${file}"`))
      }
      if (typeof item !== 'string') {
        return Promise.reject(new Error(`"${file}" is a binary file.`))
      }
      return Promise.resolve(item)
    },

    async list(path: string = ''): Promise<DiskletListing> {
      const file = normalizePath(path)
      const out: DiskletListing = {}

      // Try the path as a file:
      if (storage['/' + file] != null) out[file] = 'file'

      // Try the path as a folder:
      const folder = folderizePath(file)
      for (const key of Object.keys(storage)) {
        if (key.indexOf('/' + folder) !== 0) continue

        const slash = key.indexOf('/', 1 + folder.length)
        if (slash < 0) out[key.slice(1)] = 'file'
        else out[key.slice(1, slash)] = 'folder'
      }

      return Promise.resolve(out)
    },

    setData(path: string, data: ArrayLike<number>) {
      // We use `any` here becase Flow is too dumb to know that `ArrayLike`
      // is a perfectly acceptable argument to `Uint8Array.from`:
      const flowHack: any = data
      const array = Uint8Array.from(flowHack)

      storage['/' + normalizePath(path)] = array
      return Promise.resolve()
    },

    setText(path: string, text: string): Promise<unknown> {
      if (typeof text !== 'string') {
        return Promise.reject(new TypeError('setText expects a string'))
      }

      storage['/' + normalizePath(path)] = text
      return Promise.resolve()
    }
  }
}
