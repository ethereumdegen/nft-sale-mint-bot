import { makeReactNativeDisklet } from './backends/dummy'
import { makeLocalStorageDisklet, WebStorage } from './backends/local-storage'
import { makeMemoryDisklet, MemoryStorage } from './backends/memory'
import { makeNodeDisklet } from './backends/node'
import { DiskletFolder, downgradeDisklet } from './legacy/legacy'

export * from './helpers/helpers'
export * from './legacy/legacy'
export * from './types'
export {
  makeLocalStorageDisklet,
  makeMemoryDisklet,
  makeNodeDisklet,
  makeReactNativeDisklet
}

// legacy API ----------------------------------------------------------------

export function makeLocalStorageFolder(
  storage: WebStorage,
  opts?: { prefix?: string }
): DiskletFolder {
  return downgradeDisklet(makeLocalStorageDisklet(storage, opts))
}

export function makeMemoryFolder(storage?: MemoryStorage): DiskletFolder {
  return downgradeDisklet(makeMemoryDisklet(storage))
}

export function makeNodeFolder(path: string): DiskletFolder {
  return downgradeDisklet(makeNodeDisklet(path))
}

export function makeReactNativeFolder(): DiskletFolder {
  return downgradeDisklet(makeReactNativeDisklet())
}
