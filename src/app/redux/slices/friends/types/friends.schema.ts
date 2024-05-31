import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';


export type FriendsSchema =
    ThunkState &
    {
        friends: DomainUser[];
        requestsIn: DomainFriendRequest[];
        requestsOut: DomainFriendRequest[];
    }