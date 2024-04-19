import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';
import { ProfileSchema } from '@/app/redux/slices/profile/types/profileSchema.ts';


export type GlobalStoreSchema =
    {
        user: UserSchema;

        // Асинхронные редюсеры
        auth?: AuthSchema;
        profile?: ProfileSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];