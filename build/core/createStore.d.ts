import type { Scope } from "intentx-core-z";
import type { Store } from "./types";
import type { SharedIntentBus } from "./sharedIntentBus";
export declare function createAppScope(): Scope;
export declare function createStore<S extends object>(initial: S, scopeOrOptions?: Scope | {
    scope?: Scope;
    bus?: SharedIntentBus<S>;
}): Store<S>;
