type SignalLike<T> = {
    (): T;
    set(value: T): void;
    subscribe(fn: () => void): () => void;
};
export type AtomOptions<T> = {
    equals?: (a: T, b: T) => boolean;
};
export type AtomMiddleware<T> = (next: T, prev: T) => T;
export type Atom<T> = SignalLike<T>;
export declare function createAtomFactory(signal: <T>(v: T) => SignalLike<T>): <T>(initial: T, options?: AtomOptions<T>) => import("./createBaseAtom").Atom<T>;
export declare function createAtomWithMiddlewareFactory(signal: <T>(v: T) => SignalLike<T>): <T>(initial: T, middleware?: AtomMiddleware<T>) => import("./createBaseAtom").Atom<T>;
export {};
