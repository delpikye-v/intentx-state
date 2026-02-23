export type EqualityFn<T> = (a: T, b: T) => boolean;
export declare function createSelector<S, R>(select: (state: S) => R, isEqual?: EqualityFn<R>): (state: S) => R;
export declare function selectAtom<T, R>(atom: () => T, selector: (value: T) => R, onChange: (value: R) => void, options?: {
    isEqual?: (a: R, b: R) => boolean;
    immediate?: boolean;
}): () => void;
export declare function watchSelector<S, R>(getState: () => S, subscribe: (fn: () => void) => () => void, selector: (state: S) => R, onChange: (value: R) => void, isEqual?: EqualityFn<R>): () => void;
