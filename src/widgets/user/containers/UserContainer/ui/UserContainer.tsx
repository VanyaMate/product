import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import css from './UserContainer.module.scss';
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
import { useStore } from '@vanyamate/sec-react';
import {
    getUserPageDataEffect,
    $userPageData,
    $userPageIsPending,
} from '@/app/model/user-page/user-page.model.ts';
import { UserPosts } from '@/widgets/posts/UserPosts/ui/UserPosts.tsx';


export type UserContainerProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UserContainer: FC<UserContainerProps> = memo(function UserContainer (props) {
    const { className, login, ...other } = props;
    const userPagePending                = useStore($userPageIsPending);
    const user                           = useStore($userPageData);

    useLayoutEffect(() => {
        if (user?.login !== login) {
            getUserPageDataEffect(login);
        }
    }, [ login, user?.login ]);

    if (!user || (userPagePending && user?.login !== login) || !user) {
        return <PageLoader/>;
    }

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <div className={ css.content }>
                <section className={ css.left }>
                    <UserHeader user={ user }/>
                    <Row>
                        <CompositeAddFriendButton userId={ user.id }/>
                        <GoToPrivateDialogue
                            permissions={ user.permissions.privateDialogue }
                            userId={ user.id }/>
                        <Button
                            quad
                            styleType={ ButtonStyleType.DANGER }
                        >
                            <IoBan/>
                        </Button>
                    </Row>
                </section>
                <UserPosts className={ css.right } userId={ user.id }/>
            </div>
        </section>
    );
});