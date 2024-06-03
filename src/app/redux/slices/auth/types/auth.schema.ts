import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export type AuthSchema = ThunkState & {
    user: DomainUser | null;
};