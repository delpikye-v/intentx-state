export declare function factoryAtom<K, A>(factory: (key: K) => A, options?: {
    weak?: boolean;
}): {
    (key: K): A;
    delete(key: K): void;
    clear(): void;
};
