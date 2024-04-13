import { AuthSchema, UserSchema } from '@/app';


export type GlobalStoreSchema =
    {
        user: UserSchema;

        // Асинхронные редюсеры
        auth?: AuthSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];