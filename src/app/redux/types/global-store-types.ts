import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';
import {
    UserPageSchema,
} from '@/app/redux/slices/userPage/types/userPageSchema.ts';
import {
    SearchUsersSchema,
} from '@/app/redux/slices/searchUsers/types/types.ts';


export type GlobalStoreSchema =
    {
        user: UserSchema;

        // Асинхронные редюсеры
        auth?: AuthSchema;
        userPage?: UserPageSchema;
        searchUsers?: SearchUsersSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];