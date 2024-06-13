import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueIcon.module.scss';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';


export type PrivateDialogueIconProps =
    {
        dialogueAvatar: string;
        userAvatar: string;
        dialogueTitle: string;
        userLogin: string;
        className?: string;
    };

export const PrivateDialogueIcon: FC<PrivateDialogueIconProps> = memo(function PrivateDialogueIcon (props) {
    const {
              className,
              dialogueAvatar,
              dialogueTitle,
              userAvatar,
              userLogin,
          } = props;

    if (dialogueAvatar || userAvatar) {
        // TODO: Change alt to i18n
        return <Image
            alt="Dialogue avatar"
            className={ classNames(css.container, {}, [ className ]) }
            src={ dialogueAvatar || userAvatar }
        />;
    }

    if (dialogueTitle || userLogin) {
        return <FakeAvatar
            className={ classNames(css.container, {}, [ className ]) }
            letter={ (dialogueTitle || userLogin)[0] }
        />;
    }
});