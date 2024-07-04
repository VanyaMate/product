import { ComponentPropsWithoutRef, FC, memo } from 'react';
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
    $friendRequestsReceived, $friendRequestsSent, $friendsError, $friendsIsPending,
    $friendsList,
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

    if (!friends) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ className }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>pending: { isPending.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>error: { JSON.stringify(error) ?? 'null' }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>friends: { friends.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsIn: { requestsReceived.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsOut: { requestsSent.length }</p>

            <Col>
                <FriendRequestsInDetails/>
                <FriendRequestsOutDetails/>
                <FriendsDetails/>
            </Col>
        </div>
    );
});