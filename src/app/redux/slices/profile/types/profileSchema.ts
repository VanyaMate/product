import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUserFull } from 'product-types';


export type ProfileSchema =
    ThunkState
    & {
        profile: DomainUserFull | null;
    }