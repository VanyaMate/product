export { createGlobalStore } from './config';
export * from './providers';
export * from './slices';
export { type GlobalStoreThunk } from './types/global-store-thunk.ts';
export {
    type StoreWithManager, type StoreType, type StoreStateType, type AppDispatch,
} from './types/store.ts';
export {
    type GlobalStoreReducer, type GlobalStoreSchema, type GlobalStoreKeys,
} from './types/global-store-types.ts';
export { type IReducerManager } from './types/reducer-manager.ts';
export { useAppSelector } from './hooks/useAppSelector.ts';
export { useAppDispatch } from './hooks/useAppDispatch.ts';