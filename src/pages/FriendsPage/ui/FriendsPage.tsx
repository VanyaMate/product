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
import { useStore } from '@vanyamate/sec-react';
import {
    $friendsList, getMyFriendsEffect,
} from '@/app/model/friends/friends.model.ts';
import css from './FriendsPage.module.scss';
import classNames from 'classnames';


export type FriendsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendsPage: FC<FriendsPageProps> = memo(function FriendsPage (props) {
    const { className, ...other } = props;
    const friends                 = useStore($friendsList);

    useLayoutEffect(() => {
        getMyFriendsEffect();
    }, []);

    if (!friends) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <FriendsDetails/>
            <FriendRequestsInDetails/>
            <FriendRequestsOutDetails/>
        </div>
    );
});