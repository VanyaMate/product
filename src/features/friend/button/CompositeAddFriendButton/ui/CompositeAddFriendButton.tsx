import { FC, memo } from 'react';
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
import {
    $friendRequestsReceived,
    $friendRequestsSent,
    $friendsList,
} from '@/app/model/friends/friends.model.ts';
import { useStore } from '@vanyamate/sec-react';


export type CompositeAddFriendButtonProps =
    {
        userId: string;
    };

export const CompositeAddFriendButton: FC<CompositeAddFriendButtonProps> = memo(function CompositeAddFriendButton (props) {
    const { userId }       = props;
    const friends          = useStore($friendsList);
    const requestsSent     = useStore($friendRequestsSent);
    const requestsReceived = useStore($friendRequestsReceived);

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