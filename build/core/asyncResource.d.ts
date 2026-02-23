import { Priority } from "intentx-core-z";
export type CommonResource<T> = {
    load(): Promise<T>;
    cancel(): void;
    invalidate(priority?: Priority): void;
    status(): AsyncState<T>["status"];
    error(): any;
    setSuccess(value: T, priority?: Priority): void;
};
export type AsyncState<T> = {
    status: "idle";
} | {
    status: "loading";
    promise: Promise<T>;
} | {
    status: "success";
    data: T;
} | {
    status: "error";
    error: any;
};
export type AsyncResource<T> = {
    read(): T | undefined;
} & CommonResource<T>;
export declare function createAsyncResource<T>(fetcher: (signal?: AbortSignal) => Promise<T>, options?: {
    suspense?: boolean;
    priority?: Priority;
}): AsyncResource<T>;
