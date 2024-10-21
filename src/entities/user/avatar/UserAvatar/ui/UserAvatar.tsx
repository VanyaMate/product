import { FC, memo } from 'react';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';
import classNames from 'classnames';
import css from './UserAvatar.module.scss';
import {
    ImageBackground,
} from '@/shared/ui-kit/image/ImageBackground/ui/ImageBackground.tsx';


export enum UserAvatarSize {
    SMALL,
    MEDIUM,
    LARGE
}

export type UserAvatarProps =
    {
        avatar: string;
        login: string;
        online?: boolean;
        className?: string;
        size?: UserAvatarSize;
    };

export const UserAvatar: FC<UserAvatarProps> = memo(function UserAvatar (props) {
    const {
              className,
              avatar,
              login,
              size = UserAvatarSize.MEDIUM,
              online,
          } = props;

    const status = online === true ? 'ONLINE'
                                   : online === false
                                     ? 'OFFLINE'
                                     : '';

    return (
        <div
            className={ classNames(css.container, {
                [css.online] : online === true,
                [css.offline]: online === false,
                [css.small]  : UserAvatarSize.SMALL === size,
                [css.medium] : UserAvatarSize.MEDIUM === size,
                [css.large]  : UserAvatarSize.LARGE === size,
            }, [ className ]) }
        >
            {
                avatar
                ? <ImageBackground
                    alt={ `Avatar of ${ login }` }
                    className={ css.image }
                    data-status={ status }
                    src={ avatar }
                />
                : <FakeAvatar
                    className={ css.image }
                    data-status={ status }
                    letter={ login[0] }
                />
            }
        </div>
    );
});