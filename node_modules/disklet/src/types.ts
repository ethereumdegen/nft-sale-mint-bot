export interface DiskletListing {
  [path: string]: 'file' | 'folder'
}

export interface Disklet {
  // Like `rm -r path`:
  delete(path: string): Promise<unknown>

  // Like `cat path`:
  getData(path: string): Promise<Uint8Array>
  getText(path: string): Promise<string>

  // Like `ls -l path`:
  list(path?: string): Promise<DiskletListing>

  // Like `mkdir -p $(dirname path); echo data > path`:
  setData(path: string, data: ArrayLike<number>): Promise<unknown>
  setText(path: string, text: string): Promise<unknown>
}
