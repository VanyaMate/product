import { GlobalStoreKeys, GlobalStoreSchema } from '@/app';
import { useStoreWithManager } from '@/app/redux/hooks/useStoreWithManager.ts';
import { Reducer } from '@reduxjs/toolkit';


export const useReducerConnector = function <T extends GlobalStoreKeys> (key: T, reducer: Reducer<GlobalStoreSchema[T]>) {
    const store = useStoreWithManager();
    if (store.reducerManager.getReducerMap()[key] === undefined) {
        store.reducerManager.add(key, reducer);
    }
};