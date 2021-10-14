import { Disklet, DiskletListing } from '../index'
import { normalizePath } from './paths'

type LogOperation =
  | 'delete'
  | 'get data'
  | 'get text'
  | 'list'
  | 'set data'
  | 'set text'

interface LogOptions {
  callback?: (path: string, operation: LogOperation) => unknown
  verbose?: boolean
}

export function logDisklet(disklet: Disklet, opts: LogOptions = {}): Disklet {
  const {
    callback = (path: string, operation: string) => {
      console.log(`${operation} "${path}"`)
    },
    verbose = false
  } = opts

  const log = (operation: LogOperation, path: string): void => {
    if (verbose || /set|delete/.test(operation)) {
      callback(path, operation)
    }
  }

  return {
    delete(path: string): Promise<unknown> {
      log('delete', normalizePath(path))
      return disklet.delete(path)
    },

    getData(path: string): Promise<Uint8Array> {
      log('get data', normalizePath(path))
      return disklet.getData(path)
    },

    getText(path: string): Promise<string> {
      log('get text', normalizePath(path))
      return disklet.getText(path)
    },

    list(path?: string): Promise<DiskletListing> {
      log('list', path != null ? normalizePath(path) : '')
      return disklet.list(path)
    },

    setData(path: string, data: ArrayLike<number>): Promise<unknown> {
      log('set data', normalizePath(path))
      return disklet.setData(path, data)
    },

    setText(path: string, text: string): Promise<unknown> {
      log('set text', normalizePath(path))
      return disklet.setText(path, text)
    }
  }
}
