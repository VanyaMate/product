import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';


export type GlobalStoreSchema =
    {
        user: UserSchema;

        // Асинхронные редюсеры
        auth?: AuthSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];