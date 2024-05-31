import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';
import {
    UserPageSchema,
} from '@/app/redux/slices/userPage/types/userPageSchema.ts';
import {
    SearchUsersSchema,
} from '@/app/redux/slices/searchUsers/types/types.ts';
import {
    FriendsSchema,
} from '@/app/redux/slices/friends/types/friends.schema.ts';


export type GlobalStoreSchema =
    {
        user: UserSchema;

        // Асинхронные редюсеры
        auth?: AuthSchema;
        userPage?: UserPageSchema;
        searchUsers?: SearchUsersSchema;
        friends?: FriendsSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];