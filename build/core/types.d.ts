import type { IntentHandler, Scope } from "intentx-core-z";
import { EqualityFn } from "./selector";
export type Subscriber = () => void;
export type Store<S extends object> = {
    scope: Scope;
    state(): S;
    setState(fn: (s: S) => void): void;
    subscribe(fn: Subscriber): () => void;
    emit(type: string, payload?: any): Promise<void>;
    on(type: string, handler: IntentHandler<S>): () => void;
    watch<R>(selector: (state: S) => R, onChange: (value: R) => void, isEqual?: EqualityFn<R>): () => void;
};
