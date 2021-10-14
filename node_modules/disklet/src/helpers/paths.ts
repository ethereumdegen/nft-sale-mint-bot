/**
 * Interprets a path as a series of folder lookups,
 * handling special components like `.` and `..`.
 */
export function normalizePath(path: string): string {
  if (/^\//.test(path)) throw new Error('Absolute paths are not supported')
  const parts = path.split('/')

  // Shift down good elements, dropping bad ones:
  let i = 0 // Read index
  let j = 0 // Write index
  while (i < parts.length) {
    const part = parts[i++]
    if (part === '..') j--
    else if (part !== '.' && part !== '') parts[j++] = part

    if (j < 0) throw new Error('Path would escape folder')
  }

  // Array items from 0 to j are the path:
  return parts.slice(0, j).join('/')
}

/**
 * Appends a slash if the path isn't blank.
 */
export function folderizePath(path: string): string {
  return path === '' ? path : path + '/'
}
