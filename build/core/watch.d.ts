import type { Priority } from "intentx-core-z";
export type WatchOptions<T> = {
    immediate?: boolean;
    equals?: (a: T, b: T) => boolean;
    priority?: Priority;
};
export declare function watch<T>(getter: () => T, fn: (value: T, prev: T | undefined, onCleanup: (callback: () => void) => void) => void, options?: WatchOptions<T>): () => void;
