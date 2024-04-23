import { FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { fetchUserData } from '@/app/redux/slices/user/thunks/fetchUserData.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import { profileReducer } from '@/app/redux/slices/profile/slice/profileSlice.ts';
import { PageLoader } from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


export type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = memo(function ProfilePage (props) {
    const {}        = props;
    const { login } = useParams<{ login: string }>();
    const profile   = useAppSelector((state) => state.profile);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData({ login }));
    }, [ dispatch, login ]);
    useReducerConnector('profile', profileReducer);

    if (!profile || (profile.isPending && profile.profile.login !== login) || !profile.profile) {
        return <PageLoader/>;
    }

    return (
        <div>
            <p>{ profile.profile.id }</p>
            <p>{ profile.profile.login }</p>
            <p>{ profile.profile.avatar }</p>
            <p>{ profile.profile.contacts.email }</p>
            <p>{ profile.profile.contacts.phoneNumber }</p>
            <p>{ profile.profile.nameInfo.firstName }</p>
            <p>{ profile.profile.nameInfo.lastName }</p>
        </div>
    );
});