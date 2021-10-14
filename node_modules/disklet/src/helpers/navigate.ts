import { Disklet, DiskletListing } from '../index'
import { folderizePath, normalizePath } from './paths'

export function navigateDisklet(disklet: Disklet, path: string): Disklet {
  const prefix = folderizePath(normalizePath(path))

  return {
    delete(path: string): Promise<unknown> {
      return disklet.delete(prefix + path)
    },

    getData(path: string): Promise<Uint8Array> {
      return disklet.getData(prefix + path)
    },

    getText(path: string): Promise<string> {
      return disklet.getText(prefix + path)
    },

    list(path: string = '.'): Promise<DiskletListing> {
      return disklet.list(prefix + path).then(listing => {
        const out: DiskletListing = {}
        for (const path in listing) {
          out[path.replace(prefix, '')] = listing[path]
        }
        return out
      })
    },

    setData(path: string, data: ArrayLike<number>): Promise<unknown> {
      return disklet.setData(prefix + path, data)
    },

    setText(path: string, text: string): Promise<unknown> {
      return disklet.setText(prefix + path, text)
    }
  }
}
