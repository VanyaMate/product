import { FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { fetchUserData } from '@/app/redux/slices/user/thunks/fetchUserData.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    profileReducer,
} from '@/app/redux/slices/profile/slice/profileSlice.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


export type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = memo(function ProfilePage (props) {
    const {}            = props;
    const { login }     = useParams<{ login: string }>();
    const profileSchema = useAppSelector((state) => state.profile);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData({ login }));
    }, [ dispatch, login ]);
    useReducerConnector('profile', profileReducer);

    if (!profileSchema || (profileSchema.isPending && profileSchema.profile?.login !== login) || !profileSchema.profile) {
        return <PageLoader/>;
    }

    return (
        <div>
            <p>{ profileSchema.profile.id }</p>
            <p>{ profileSchema.profile.login }</p>
            <p>{ profileSchema.profile.avatar }</p>
            <p>{ profileSchema.profile.contacts.email }</p>
            <p>{ profileSchema.profile.contacts.phoneNumber }</p>
            <p>{ profileSchema.profile.nameInfo.firstName }</p>
            <p>{ profileSchema.profile.nameInfo.lastName }</p>
        </div>
    );
});