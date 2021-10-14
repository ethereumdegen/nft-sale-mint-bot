import { NativeModules } from 'react-native'
import { base64 } from 'rfc4648'

import { normalizePath } from '../helpers/paths'
import { Disklet, DiskletListing } from '../index'

const native = NativeModules.Disklet

/**
 * Returns a Disklet interface located in the application's data directory.
 */
export function makeReactNativeDisklet(): Disklet {
  return {
    delete(path: string): Promise<unknown> {
      return native.delete(normalizePath(path))
    },

    getData(path: string): Promise<Uint8Array> {
      return native
        .getData(normalizePath(path))
        .then((data: string) => base64.parse(data))
    },

    getText(path: string): Promise<string> {
      return native.getText(normalizePath(path))
    },

    list(path: string = ''): Promise<DiskletListing> {
      return native.list(normalizePath(path))
    },

    setData(path: string, data: ArrayLike<number>): Promise<unknown> {
      return native.setData(normalizePath(path), base64.stringify(data))
    },

    setText(path: string, text: string): Promise<unknown> {
      return native.setText(normalizePath(path), text)
    }
  }
}
