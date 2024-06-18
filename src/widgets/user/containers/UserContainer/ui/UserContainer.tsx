import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UserContainer.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
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
import { UserHeader } from '@/entities/user/UserHeader/ui/UserHeader.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    CompositeAddFriendButton,
} from '@/features/friend/button/CompositeAddFriendButton/ui/CompositeAddFriendButton.tsx';
import {
    GoToPrivateDialogue,
} from '@/features/private-dialogue/button/GoToPrivateDialogue/ui/GoToPrivateDialogue.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoBan } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type UserContainerProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UserContainer: FC<UserContainerProps> = memo(function UserContainer (props) {
    const { className, login, ...other } = props;
    const userPage                       = useAppSelector((state) => state.userPage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserPageData({ login }));
    }, [ dispatch, login ]);
    useReducerConnector('userPage', userPageReducer);

    if (!userPage || (userPage.isPending && userPage.user?.login !== login) || !userPage.user) {
        return <PageLoader/>;
    }

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <UserHeader user={ userPage.user }/>
            <Row>
                <CompositeAddFriendButton userId={ userPage.user.id }/>
                <GoToPrivateDialogue
                    permissions={ userPage.user.permissions.privateDialogue }
                    userId={ userPage.user.id }/>
                <Button
                    quad
                    styleType={ ButtonStyleType.DANGER }
                >
                    <IoBan/>
                </Button>
            </Row>
            <p>{ userPage.user.contacts.email }</p>
            <p>{ userPage.user.contacts.phoneNumber }</p>
            <p>{ userPage.user.nameInfo.firstName }</p>
            <p>{ userPage.user.nameInfo.lastName }</p>
        </section>
    );
});