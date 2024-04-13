import { Action, Reducer, ReducersMapObject } from '@reduxjs/toolkit';


export interface IReducerManager<T> {
    getReducerMap: () => ReducersMapObject<T>,
    reduce: (state: T, action: Action) => T,
    add: (key: keyof T, reducer: Reducer) => void,
    remove: (key: keyof T) => void,
}