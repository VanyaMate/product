import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    FriendsDetails,
} from '@/widgets/friends/details/FriendsDetails/ui/FriendsDetails.tsx';
import {
    FriendRequestsOutDetails,
} from '@/widgets/friends/details/FriendRequestsOutDetails/ui/FriendRequestsOutDetails.tsx';
import {
    FriendRequestsInDetails,
} from '@/widgets/friends/details/FriendRequestsInDetails/ui/FriendRequestsInDetails.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $friendRequestsReceived,
    $friendRequestsSent,
    $friendsError,
    $friendsIsPending,
    $friendsList, getMyFriendsEffect,
} from '@/app/model/friends/friends.model.ts';


export type FriendsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendsPage: FC<FriendsPageProps> = memo(function FriendsPage (props) {
    const { className, ...other } = props;
    const isPending               = useStore($friendsIsPending);
    const error                   = useStore($friendsError);
    const friends                 = useStore($friendsList);
    const requestsReceived        = useStore($friendRequestsReceived);
    const requestsSent            = useStore($friendRequestsSent);

    useLayoutEffect(() => {
        getMyFriendsEffect();
    }, []);

    if (!friends) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ className }
        >
            <p>pending: { isPending.toString() }</p>
            <p>error: { JSON.stringify(error) ?? 'null' }</p>
            <p>friends: { friends.length }</p>
            <p>requestsIn: { requestsReceived.length }</p>
            <p>requestsOut: { requestsSent.length }</p>

            <Col>
                <FriendRequestsInDetails/>
                <FriendRequestsOutDetails/>
                <FriendsDetails/>
            </Col>
        </div>
    );
});