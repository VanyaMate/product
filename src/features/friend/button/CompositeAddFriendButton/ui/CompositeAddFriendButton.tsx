import { FC, memo } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getFriendsList,
} from '@/app/redux/slices/friends/selectors/getFriendsList/getFriendsList.ts';
import {
    getFriendsRequestsSent,
} from '@/app/redux/slices/friends/selectors/getFriendsRequestsOut/getFriendsRequestsSent.ts';
import {
    getFriendsRequestsReceived,
} from '@/app/redux/slices/friends/selectors/getFriendsRequestsIn/getFriendsRequestsReceived.ts';
import {
    DomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';
import {
    AcceptFriendRequestButton,
} from '@/features/friend/button/AcceptFriendRequestButton/ui/AcceptFriendRequestButton.tsx';
import {
    CancelFriendRequestButton,
} from '@/features/friend/button/CancelFriendRequestButton/ui/CancelFriendRequestButton.tsx';
import {
    AddToFriendButton,
} from '@/features/friend/button/AddToFriendButton/ui/AddToFriendButton.tsx';


export type CompositeAddFriendButtonProps =
    {
        userId: string;
    };

export const CompositeAddFriendButton: FC<CompositeAddFriendButtonProps> = memo(function CompositeAddFriendButton (props) {
    const { userId }       = props;
    const friends          = useAppSelector(getFriendsList);
    const requestsSent     = useAppSelector(getFriendsRequestsSent);
    const requestsReceived = useAppSelector(getFriendsRequestsReceived);

    const isFriend: boolean = friends.some((friend) => friend.id === userId);
    if (isFriend) {
        return <AddToFriendButton disabled userId={ userId }/>;
    }

    const receivedFriendRequest: DomainFriendRequest = requestsReceived.find((request) => request.user.id === userId);
    if (receivedFriendRequest) {
        return (
            <AcceptFriendRequestButton
                requestId={ receivedFriendRequest.requestId }
            />
        );
    }

    const sentFriendRequest: DomainFriendRequest = requestsSent.find((request) => request.user.id === userId);
    if (sentFriendRequest) {
        return (
            <CancelFriendRequestButton
                requestId={ sentFriendRequest.requestId }
            />
        );
    }

    return <AddToFriendButton userId={ userId }/>;
});