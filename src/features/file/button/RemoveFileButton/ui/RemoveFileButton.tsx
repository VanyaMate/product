import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoTrash } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { removeFileEffect } from '@/app/model/file-page/file-page.model.ts';


export type RemoveFileButtonProps =
    {
        fileId: string;
    }
    & ButtonProps;

export const RemoveFileButton: FC<RemoveFileButtonProps> = memo(function RemoveFileButton (props) {
    const { fileId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => removeFileEffect(fileId) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoTrash/>
        </ButtonWithLoading>
    );
});