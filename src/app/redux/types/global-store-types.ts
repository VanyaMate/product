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
import {
    NotificationsSchema,
} from '@/app/redux/slices/notifications/types/notifications.schema.ts';
import {
    PrivateDialoguesSchema,
} from '@/app/redux/slices/private-dialogues/types/private-dialogues.schema.ts';
import {
    PrivateMessagesSchema,
} from '@/app/redux/slices/private-messages/types/privateMessages.schema.ts';
import {
    PrivateMessagesSearchSchema,
} from '@/app/redux/slices/private-messages-search/types/private-messages-search.schema.ts';


export type GlobalStoreSchema =
    {
        auth: AuthSchema;

        // Асинхронные редюсеры
        userPage?: UserPageSchema;
        searchUsers?: SearchUsersSchema;
        friends?: FriendsSchema;
        notifications?: NotificationsSchema;
        dialogues?: PrivateDialoguesSchema;
        privateMessages?: PrivateMessagesSchema;
        privateMessagesSearch?: PrivateMessagesSearchSchema;
    };

export type GlobalStoreKeys = keyof GlobalStoreSchema;
export type GlobalStoreReducer = GlobalStoreSchema[GlobalStoreKeys];