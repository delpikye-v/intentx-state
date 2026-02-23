import type { Priority, Signal } from "intentx-core-z";
export type Atom<T> = Signal<T> & {
    update(fn: (prev: T) => T, priority?: Priority): void;
};
export type AtomTransform<T> = (next: T, prev: T) => T;
export declare function createBaseAtomFactory(signal: <T>(v: T) => Signal<T>): <T>(initial: T, transform?: AtomTransform<T>) => Atom<T>;
