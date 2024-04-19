import { FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { fetchUserData } from '@/app/redux/slices/user/thunks/fetchUserData.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import { profileReducer } from '@/app/redux/slices/profile/slice/profileSlice.ts';


export type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = memo(function ProfilePage (props) {
    const {}           = props;
    const { username } = useParams<{ username: string }>();
    const profile      = useAppSelector((state) => state.profile);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData({ username }));
    }, [ dispatch, username ]);
    useReducerConnector('profile', profileReducer);

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            {
                profile?.profile?.username
            }
        </div>
    );
});