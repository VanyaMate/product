import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/types/store.ts';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();