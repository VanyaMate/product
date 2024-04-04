import { User } from '@/components/entities/users/model/types/user.ts';


export type UserSchema = {
    authData: User | null;
}