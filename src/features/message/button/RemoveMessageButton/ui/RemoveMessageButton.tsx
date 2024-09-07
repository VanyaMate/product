import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoTrash } from 'react-icons/io5';
import {
    removePrivateMessageEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type RemoveMessageButtonProps =
    {
        messageId: string;
    }
    & ButtonProps;

export const RemoveMessageButton: FC<RemoveMessageButtonProps> = memo(function RemoveMessageButton (props) {
    const { messageId, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <PopOver popover={ t.page.dialogues.remove_message }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t.page.dialogues.remove_message }
                onClick={ () => removePrivateMessageEffect(messageId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoTrash/>
            </ButtonWithLoading>
        </PopOver>
    );
});