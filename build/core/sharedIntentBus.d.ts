import type { Scope, IntentContext, IntentHandler } from "intentx-core-z";
export type SharedIntentBus<S> = {
    register: (scope: Scope, factory: (payload: any) => IntentContext<S>) => () => void;
    on: (type: string, handler: IntentHandler<S>) => () => void;
    emit: (type: string, payload?: any) => Promise<void>;
};
export declare function createSharedIntentBus<S>(): SharedIntentBus<S>;
