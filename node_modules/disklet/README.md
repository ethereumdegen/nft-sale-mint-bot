# Disklet

[![Build Status](https://travis-ci.org/EdgeApp/disklet.svg?branch=master)](https://travis-ci.org/EdgeApp/disklet)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A tiny, composable filesystem API.

The Disklet library provides a simple way to read and write files on a variety of platforms:

* Browser (via LocalStorage)
* Node.js
* React Native
* Memory

The API focuses on simplicity and ease-of-use, rather than advanced features. It packs everything you need into six simple methods:

* `getData` / `getText`
* `setData` / `setText`
* `delete`
* `list`

These methods do a lot, though. If you try to write to a folder that doesn't exist, for example, Disklet will automatically create it for you. Likewise, the `delete` method works on both files and folders. This lets you focus on your data, not path manipulation or other filesystem details.

Here is an example:

```javascript
import { makeMemoryDisklet } from 'disklet'

async function demo () {
  // Let's make an in-memory filesystem:
  const disklet = makeMemoryDisklet()

  // Writing a file automatically creates any necessary folders:
  await disklet.setText('a/file.txt', 'Hello')

  // Binary files work with Arrays / Uint8Arrays of bytes:
  await disklet.setData('a/b/file.bin', [72, 73, 10])
  await disklet.getData('a/b/file.bin') // Uint8Array [ 72, 73, 10 ]

  // Listing a folder returns paths and types:
  await disklet.list('./a/') // { 'a/file.txt': 'file', 'a/b': 'folder' }

  // Removing stuff is easy:
  await disklet.delete('a')
}
```

You can compose these `Disklet` objects together in various ways:

* `navigateDisklet` opens a new `Disklet` object pointed at a sub-folder. All paths are relative to this new location.
* `logDisklet` wraps logging around any `Disklet` instance (great for debugging).
* `mergeDisklets` creates a merged view of two folders.

The library has tree-shaking support, so tools like [rollup.js](https://rollupjs.org/) or [Webpack](https://webpack.js.org/) can automatically trim away any features you don't use. Even with all platforms and features present, the library is only about 4.5K (min + gzip).

Disklet requires a `Promise` implementation, but is plain ES5 otherwise. The library also includes TypeScript and Flow typings if you need them.

## React Native

To use this library on React Native, simply run `react-native link disklet` after installing via yarn / NPM.

## Legacy API

Disklet used to have an older, more complicated API. To help porting old codebases to the new API, this library contains a `downgradeDisklet` function, which will convert a modern `Disklet` object to the older `Folder` interface.

The [old functions](./docs/legacy.md) are deprecated but still present for now. They will go away in an upcoming 1.0 release.

## API overview

The `Disklet` interface has the following methods:

```typescript
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

export type DiskletListing = { [path: string]: 'file' | 'folder' }
```

The following functions create new `Disklet` objects:

* `makeLocalStorageDisklet`
* `makeMemoryDisklet`
* `makeNodeDisklet(path)`
* `makeReactNativeDisklet`

These functions combine or wrap `Disklet` instances in various ways:

* `logDisklet`
* `mergeDisklets`
* `navigateDisklet`

Finally, the library contains some standalone functions to help with folder listings:

* `deepList`
* `justFiles`
* `justFolders`

### Text vs. Data

Some backends, such as Node.js and React Native, store binary data on disk. They implement `getText` and `setText` using the UTF-8 encoding.

Other backends, such as `LocalStorage`, only store text. They implement `getData` and `setData` using the base64 encoding.

This means saving a file in binary format and then loading it in text format (or vice-versa) will be undefined and platform-dependent. This is an unfortunate side-effect of running in multiple environments.

### Paths

All Disklet paths are relative URI's. This means the folder separator is always '/', even on Windows. Paths are not allowed to be absolute, so something like '/home/user/somefile.txt' is not valid. Likewise, paths are not allowed to "escape" the Disklet location, so '../somefile.txt' isn't valid either (but 'a/../somefile.txt' is fine).

You can use the `navigateDisklet` function to create a new Disklet instance locked to a particular location. If you pass this folder to a module within your program, you can rest assured that the module will only write files where it is supposed to. At the same time, the module never has to worry about *where* the right location is, since the Disklet object encapsulates that information.

## API reference

### Storage backends

#### `makeLocalStorageDisklet(storage = window.localStorage, opts = {}): Disklet`

Creates a Disklet that stores its data in the browser's localStorage.

A file's path becomes its localStorage key, and its contents become a localStorage string value. If a `prefix` is provided via the `opts` parameter, then all localStorage keys will begin with the provided string. Binary data is transformed to base64, since localStorage can only handle strings.

#### `makeMemoryFolder(storage = {}): Disklet`

A memory folder stores its contents in a Javascript object.

The file paths are the object keys, and the file contents are stored as-is (Uint8Arrays for `setData` and strings for `setText`). All paths start with `/`, so they will never conflict with "magic" Javascript names like `__proto__`.

#### `makeNodeDisklet(path: string): Disklet`

The Node.js folder backend writes files and folders directly to disk. It requires a starting path that everything will be located under.

Binary data is written as-is, while text is stored in utf-8.

#### `makeReactNativeDisklet()`

Creates a Disklet object with access to the phone's file system, starting at the app's document directory.

### Helpers

#### `deepList(disklet: Disklet, path: string = ''): Promise<DiskletListing>`

Recursively lists a folder.

#### `justFiles(listing: DiskletListing): string[]`

This function will return an array with just the file names in a listing. You can use it like `justFiles(await disklet.list())` or `justFiles(await deepList(disklet))`.

#### `justFolders(listing: DiskletListing): string[]`

Like `justFiles`, but for folders, this will return an array with just the paths to subfolders.

#### `logDisklet(disklet: Disklet, opts = {}): Disklet`

This function wraps a Disklet with logging.

By default, only changes will be logged. To log everything, set `opts.verbose` to `true`.

If you would like to send the logs somewhere other than `console.log`, pass a callback function as `opts.callback`. The callback's parameters are a path and an operation name, which is one of:

* "delete"
* "get data"
* "get text"
* "list"
* "set data"
* "set text"

#### `mergeDisklets(master: Disklet, fallback: Disklet): Disklet`

Creates a unified view of two Disklets. When reading files, the union tries the `master` folder first, and then the `fallback` folder if anything goes wrong. All writes go to the `master` folder, and deletes go to both folders.

#### `navigateDisklet(disklet: Disklet, path: string): Disklet`

Creates a new Disklet scoped to a sub-folder of the parent Disklet.

### `Disklet`

#### `delete(path: string): Promise<unknown>`

Recursively deletes a file or folder (including all contents). Does nothing if the path doesn't exist.

#### `getData(path: string): Promise<Uint8Array>`

Reads a file's contents as binary data. The path must exist and be a binary file, or this will fail.

#### `getText(path: string): Promise<string>`

Reads a file's contents as text. The path must exist and be a text file, or this will fail.

#### `list(path?: string): Promise<DiskletListing>`

Lists a folders's contents. Returns an empty listing if the location is missing (`{}`). If the path points to a file instead of a folder, returns the file's normalized path and type (`{ 'a/somefile.txt': 'file' }`).

#### `setData(path: string, data: ArrayLike<number>): Promise<unknown>`

Writes an array of bytes to disk as a file. This will recursively create any folders needed to hold the file.

#### `setText(path: string, text: string): Promise<unknown>`

Writes a string to disk as a file. This will recursively create any folders needed to hold the file.
