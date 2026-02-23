import { CommonResource } from "./asyncResource";
export type AsyncAtom<T> = {
    (): T | undefined;
} & CommonResource<T>;
export declare function asyncAtom<T>(fetcher: (signal?: AbortSignal) => Promise<T>, options?: {
    suspense?: boolean;
}): AsyncAtom<T>;
export declare function asyncAtomFamily<K, T>(factory: (key: K) => (signal?: AbortSignal) => Promise<T>, options?: {
    suspense?: boolean;
}): (key: K) => AsyncAtom<T>;
