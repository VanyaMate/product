import { useStoreWithManager } from '@/app/redux/hooks/useStoreWithManager.ts';
import { Reducer } from '@reduxjs/toolkit';
import {
    GlobalStoreKeys,
    GlobalStoreSchema,
} from '@/app/redux/types/global-store-types.ts';


export const useReducerConnector = function <T extends GlobalStoreKeys> (key: T, reducer: Reducer<GlobalStoreSchema[T]>) {
    const store = useStoreWithManager();
    if (store.reducerManager.getReducerMap()[key] === undefined) {
        store.reducerManager.add(key, reducer);
    }
};