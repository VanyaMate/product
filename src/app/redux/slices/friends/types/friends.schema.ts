import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';


export type FriendsSchema =
    ThunkState &
    {
        friends: DomainUser[];
        friend_requests_in: DomainNotificationFriendRequestData[];
        friend_requests_out: DomainNotificationFriendRequestData[];
    }