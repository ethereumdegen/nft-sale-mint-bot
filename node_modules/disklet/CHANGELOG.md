# Disklet

## 0.5.0 (2021-03-08)

- Add a `dumpData` helper function to grab all the data stored under a Disklet object.

## 0.4.6 (2020-10-06)

- Stop using deprecated Gradle features for React Native Android.

## 0.4.5 (2020-05-25)

- Add `justFiles` and `justFolders` helper functions.

## 0.4.4 (2019-11-19)

- Fix a race condition when writing files on Node.js.
- Improve the readme file.

## 0.4.3 (2019-10-23)

- Fix the TypeScript definitions not to conflict with React Native.
- Convert the internal type system from Flow to TypeScript.

## 0.4.2 (2019-09-17)

- Upgrade to rfc4648 ^1.0.0.

## 0.4.1 (2019-03-28)

- Add `disklet.podspec` file for iOS React Native.
- Simplify `build.gradle` file for Android React Native.

## 0.4.0 (2019-03-21)

- Implement the React Native backend directly, avoiding the external dependency on `react-native-fs`. The `react-native link disklet` command works instead now.

## 0.3.1 (2019-01-25)

- Activate unit tests that were not running.
- Fix `navigateDisklet` directory listing not to include the parent path.
- Fix `logDisklet` to always return normalized paths.

## 0.3.0 (2018-11-16)

- Add a new, radically simplified API. The existing API is still available but deprecated:
  - `makeLocalStorageFolder` → `makeLocalStorageDisklet`
  - `makeMemoryFolder` → `makeMemoryDisklet`
  - `makeNodeFolder` → `makeNodeDisklet`
  - `makeReactNativeFolder` → `makeReactNativeDisklet`
- New utilities:
  - `deepList`
  - `logDisklet`
  - `mergeDisklets`
  - `navigateDisklet`
- Add a new `downgradeDisklet` helper to convert new `Disklet` objects to the old `DiskletFolder` interface.

## 0.2.10 (2018-11-13)

- Fix Flow errors.

## 0.2.9 (2018-11-12)

- Add complete Flow typing coverage.
- Fix binary data on React Native (`setData` / `getData` were corrupting data before).

## 0.2.8 (2018-11-03)

- Upgrade build tooling.
- Begin adding Flow types.

## 0.2.7

- Fix the `EISDIR` error on React Native Android

## 0.2.6

- Add getPath() endpoint for Files

## 0.2.3

- Fix Android due to varied error codes from OS

## 0.2.2

- Add support for using react-native-fs

## 0.1.3

- Create directories even more carefully

## 0.1.2

- Fix some documentation typos
- Fix the `browser` section of `package.json`
- Do not fail on parallel disk writes to Node.js folders

## 0.1.1

- Clean up the documentation
- Add missing typings for `mapFolders`
- Add the `makeLoggedFolder` helper

## 0.1.0

- Initial release
