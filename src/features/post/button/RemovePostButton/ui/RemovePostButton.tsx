import { FC, memo } from 'react';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { removePostEffect } from '@/app/model/posts/posts.model.ts';
import { IoTrash } from 'react-icons/io5';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type RemovePostButtonProps =
    {
        postId: string;
    }
    & ButtonProps;

export const RemovePostButton: FC<RemovePostButtonProps> = memo(function RemovePostButton (props) {
    const { postId, ...other } = props;

    return (
        <PopOver popover="Удалить">
            <ButtonWithLoading
                { ...other }
                onClick={ async () => removePostEffect(postId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoTrash/>
            </ButtonWithLoading>
        </PopOver>
    );
});