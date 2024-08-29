import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
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
import { IoBan, IoEllipsisHorizontal } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    $userPageData,
    $userPageIsPending,
    getUserPageDataEffect,
} from '@/app/model/user-page/user-page.model.ts';
import { UserPosts } from '@/widgets/posts/UserPosts/ui/UserPosts.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    Divider,
    DividerType,
} from '@/shared/ui-kit/divider/Divider/ui/Divider.tsx';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    WorkInProgress,
} from '@/entities/site/WorkInProgress/ui/WorkInProgress.tsx';
import {
    ImageBackground,
} from '@/shared/ui-kit/image/ImageBackground/ui/ImageBackground.tsx';
import {
    CreateCallRequestButton,
} from '@/features/call/button/CreateCallRequestButton/ui/CreateCallRequestButton.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserContainerProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UserContainer: FC<UserContainerProps> = memo(function UserContainer (props) {
    const { className, login, ...other } = props;
    const userPagePending                = useStore($userPageIsPending);
    const user                           = useStore($userPageData);
    const { t }                          = useTranslation();

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
                 className={ classNames(css.container, { [css.withBackground]: !!user.background }, [ className ]) }>
            <div className={ css.content }>
                <section className={ css.left }>
                    <UserHeader user={ user }/>
                    <Row>
                        <CompositeAddFriendButton userId={ user.id }/>
                        <GoToPrivateDialogue
                            permissions={ user.permissions.privateDialogue }
                            userId={ user.id }
                        />
                        <CreateCallRequestButton userId={ user.id }/>
                        <Button
                            quad
                            styleType={ ButtonStyleType.DANGER }
                        >
                            <IoBan/>
                        </Button>
                    </Row>
                </section>
                <Col className={ css.right }>
                    <Row>
                        <Button>{ t.app.posts_page }</Button>
                        <PopOver popover={ <WorkInProgress/> }>
                            <Button
                                styleType={ ButtonStyleType.GHOST }>
                                { t.app.friends_page }
                            </Button>
                        </PopOver>
                        <PopOver popover={ <WorkInProgress/> }>
                            <Button
                                styleType={ ButtonStyleType.GHOST }>
                                { t.app.music_page }
                            </Button>
                        </PopOver>
                        <PopOver popover={ <WorkInProgress/> }>
                            <Button
                                styleType={ ButtonStyleType.GHOST }>
                                { t.app.photos_page }
                            </Button>
                        </PopOver>
                        <PopOver popover={ <WorkInProgress/> }>
                            <Button
                                quad
                                styleType={ ButtonStyleType.GHOST }
                            >
                                {/* eslint-disable-next-line react/jsx-max-depth */ }
                                <IoEllipsisHorizontal/>
                            </Button>
                        </PopOver>
                    </Row>
                    <Divider type={ DividerType.HORIZONTAL }/>
                    <UserPosts className={ css.content } userId={ user.id }/>
                </Col>
            </div>
            {
                user.background
                ? <ImageBackground
                    alt="background"
                    className={ css.background }
                    src={ user.background }
                />
                : null
            }
        </section>
    );
});