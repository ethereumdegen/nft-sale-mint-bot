import { Disklet, DiskletListing } from '../index'

export function mergeDisklets(master: Disklet, fallback: Disklet): Disklet {
  return {
    delete(path: string): Promise<unknown> {
      return Promise.all([master.delete(path), fallback.delete(path)])
    },

    getData(path: string): Promise<Uint8Array> {
      return master.getData(path).catch(e => fallback.getData(path))
    },

    getText(path: string): Promise<string> {
      return master.getText(path).catch(e => fallback.getText(path))
    },

    list(path?: string): Promise<DiskletListing> {
      return Promise.all([
        master.list(path),
        fallback.list(path)
      ]).then(([masterList, fallbackList]) =>
        Object.assign(fallbackList, masterList)
      )
    },

    setData(path: string, data: ArrayLike<number>): Promise<unknown> {
      return master.setData(path, data)
    },

    setText(path: string, text: string): Promise<unknown> {
      return master.setText(path, text)
    }
  }
}
