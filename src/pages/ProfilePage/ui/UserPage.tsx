import { FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    fetchUserPageData,
} from '@/app/redux/slices/userPage/thunks/fetchUserPageData.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    userPageReducer,
} from '@/app/redux/slices/userPage/slice/userPageSlice.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


export type UserPageProps = {};

export const UserPage: FC<UserPageProps> = memo(function UserPage (props) {
    const {}        = props;
    const { login } = useParams<{ login: string }>();
    const userPage  = useAppSelector((state) => state.userPage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserPageData({ login }));
    }, [ dispatch, login ]);
    useReducerConnector('userPage', userPageReducer);

    if (!userPage || (userPage.isPending && userPage.user?.login !== login) || !userPage.user) {
        return <PageLoader/>;
    }

    return (
        <div>
            <p>{ userPage.user.id }</p>
            <p>{ userPage.user.login }</p>
            <p>{ userPage.user.avatar }</p>
            <p>{ userPage.user.contacts.email }</p>
            <p>{ userPage.user.contacts.phoneNumber }</p>
            <p>{ userPage.user.nameInfo.firstName }</p>
            <p>{ userPage.user.nameInfo.lastName }</p>
        </div>
    );
});