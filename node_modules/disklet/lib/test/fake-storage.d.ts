/**
 * Emulates the `localStorage` browser API.
 */
export declare class FakeStorage {
    _items: {
        [key: string]: string;
    };
    constructor(items?: {});
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(n: number): string;
    clear(): void;
    get length(): number;
}
