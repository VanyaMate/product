import { request } from '@/app/lib/fetch/request.ts';
import { isDomainFriends } from 'product-types/dist/friends/DomainFriends';


export const getMyFriendsAction = () =>
    request('/v1/friends', {}, isDomainFriends);