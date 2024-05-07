export type AxiosQueueResolve = (value?: unknown) => void;
export type AxiosQueueItem = {
    pending: boolean;
    queue: AxiosQueueResolve[];
};
export type AxiosQueueDictionary = Record<string, any>;

export interface IAxiosQueue {
    add (url: string, resolve: AxiosQueueResolve): void;

    next (url: string): void;
}