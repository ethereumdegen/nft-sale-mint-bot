/**
 * Interprets a path as a series of folder lookups,
 * handling special components like `.` and `..`.
 */
export declare function normalizePath(path: string): string;
/**
 * Appends a slash if the path isn't blank.
 */
export declare function folderizePath(path: string): string;
