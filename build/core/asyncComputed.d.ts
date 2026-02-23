import type { Priority } from "intentx-core-z";
export type AsyncComputed<T> = {
    (): T | undefined;
    invalidate(priority?: Priority): void;
    status(): string;
    error(): any;
};
export declare function asyncComputed<T>(getter: (signal?: AbortSignal) => Promise<T>, priority?: Priority): AsyncComputed<T>;
