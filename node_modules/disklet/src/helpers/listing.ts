import { Disklet, DiskletListing } from '../index'

/**
 * Recursively lists a folder.
 */
export function deepList(
  disklet: Disklet,
  path?: string
): Promise<DiskletListing> {
  return disklet.list(path).then(list =>
    // Recurse into subfolders:
    Promise.all(
      Object.keys(list)
        .filter(path => list[path] === 'folder')
        .map(path => deepList(disklet, path))
    ).then(children => Object.assign(list, ...children))
  )
}

/**
 * Filters a listing down to just an array of file paths.
 */
export function justFiles(listing: DiskletListing): string[] {
  return Object.keys(listing).filter(path => listing[path] === 'file')
}

/**
 * Filters a listing down to just an array of folder paths.
 */
export function justFolders(listing: DiskletListing): string[] {
  return Object.keys(listing).filter(path => listing[path] === 'folder')
}
