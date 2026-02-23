export type ReadonlyAtom<T> = {
    (): T;
};
export declare const atom: <T>(initial: T, options?: import("./createAtomFactory").AtomOptions<T>) => import("./createBaseAtom").Atom<T>;
export declare const atomMiddleware: <T>(initial: T, middleware?: import("./createAtomFactory").AtomMiddleware<T>) => import("./createBaseAtom").Atom<T>;
export declare function readonlyAtom<T>(base: ReadonlyAtom<T>): ReadonlyAtom<T>;
