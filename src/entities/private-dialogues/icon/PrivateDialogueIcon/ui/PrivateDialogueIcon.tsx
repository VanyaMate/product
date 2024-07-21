import { FC, memo } from 'react';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';


export type PrivateDialogueIconProps =
    {
        dialogueAvatar: string;
        userAvatar: string;
        dialogueTitle: string;
        userLogin: string;
        online: boolean;
        className?: string;
    };

export const PrivateDialogueIcon: FC<PrivateDialogueIconProps> = memo(function PrivateDialogueIcon (props) {
    const {
              className,
              dialogueAvatar,
              dialogueTitle,
              userAvatar,
              userLogin,
              online,
          } = props;

    return (
        <UserAvatar
            avatar={ dialogueAvatar || userAvatar }
            className={ className }
            login={ dialogueTitle || userLogin }
            online={ online }
        />
    );
});