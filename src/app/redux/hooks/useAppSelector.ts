import { useSelector } from 'react-redux';
import { StoreStateType } from '@/app/redux/types/store.ts';


export const useAppSelector = useSelector.withTypes<StoreStateType>();