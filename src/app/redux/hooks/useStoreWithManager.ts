import { useStore } from 'react-redux';
import { StoreWithManager } from '@/app/redux/types/store.ts';


export const useStoreWithManager = () => useStore() as StoreWithManager;