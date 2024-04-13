import { Action, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import {
    GlobalStoreKeys,
    GlobalStoreSchema,
} from '../types/global-store-types.ts';
import { IReducerManager } from '@/app';


export function createReducerManager (initialReducers: ReducersMapObject<GlobalStoreSchema>): IReducerManager<GlobalStoreSchema> {
    const reducers                      = { ...initialReducers };
    let combinedReducer                 = combineReducers(reducers);
    let keysToRemove: GlobalStoreKeys[] = [];

    return {
        getReducerMap: () => reducers,
        reduce       : (state: GlobalStoreSchema, action: Action) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                for (const key of keysToRemove) {
                    delete state[key];
                }
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },

        add   : (key: GlobalStoreKeys, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key]   = reducer;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: GlobalStoreKeys) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}