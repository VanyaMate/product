import { FC, memo } from 'react';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';


export type UserAvatarProps =
    {
        avatar: string;
        login: string;
        className?: string;
    };

export const UserAvatar: FC<UserAvatarProps> = memo(function UserAvatar (props) {
    const { className, avatar, login } = props;

    return avatar
           ? <Image
               alt={ `Avatar of ${ login }` }
               className={ className }
               src={ avatar }
           />
           : <FakeAvatar
               className={ className }
               letter={ login[0] }
           />;
});