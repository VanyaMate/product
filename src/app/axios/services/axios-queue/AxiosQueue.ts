import {
    AxiosQueueDictionary, AxiosQueueResolve,
    IAxiosQueue,
} from '@/app/axios/services/axios-queue/axios-queue.interface.ts';


export class AxiosQueue implements IAxiosQueue {
    private readonly _queue: AxiosQueueDictionary = {};

    add (url: string, resolve: AxiosQueueResolve): void {
        const urlQueue = this._queue[url] = this._queue[url] ?? {
            pending: false,
            queue  : [],
        };

        if (urlQueue.pending === false) {
            urlQueue.pending = true;
            resolve();
        } else {
            urlQueue.queue.push(resolve);
        }
    }

    next (url: string): void {
        const urlQueue = this._queue[url];
        if (urlQueue.queue) {
            const next = urlQueue.queue.shift();
            if (next) {
                next();
            } else {
                urlQueue.pending = false;
            }
        }
    }
}