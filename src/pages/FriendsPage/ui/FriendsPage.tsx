import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
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
import { useFriendsUpdater } from '@/features/store/useFriendsUpdater.ts';


export type FriendsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendsPage: FC<FriendsPageProps> = memo(function FriendsPage (props) {
    const { className, ...other } = props;
    const friends                 = useAppSelector((state) => state.friends);

    useFriendsUpdater();

    if (!friends) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ className }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>pending: { friends.isPending.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>error: { friends.error?.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>friends: { friends.friends.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsIn: { friends.requestsIn.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsOut: { friends.requestsOut.length }</p>

            <FriendRequestsInDetails/>
            <FriendRequestsOutDetails/>
            <FriendsDetails/>
        </div>
    );
});