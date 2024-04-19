import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { User } from '@/app/types/user';


export type ProfileSchema =
    ThunkState
    & {
        profile: User | null;
    }