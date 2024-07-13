import { FC, memo } from 'react';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';
import classNames from 'classnames';
import css from './UserAvatar.module.scss';
import {
    ImageBackground,
} from '@/shared/ui-kit/image/ImageBackground/ui/ImageBackground.tsx';


export type UserAvatarProps =
    {
        avatar: string;
        login: string;
        className?: string;
    };

export const UserAvatar: FC<UserAvatarProps> = memo(function UserAvatar (props) {
    const { className, avatar, login } = props;

    return (
        <div className={ classNames(css.container, {}, [ className ]) }>
            {
                avatar
                ? <ImageBackground
                    alt={ `Avatar of ${ login }` }
                    className={ css.image }
                    src={ avatar }
                />
                : <FakeAvatar
                    className={ css.image }
                    letter={ login[0] }
                />
            }
        </div>
    );
});