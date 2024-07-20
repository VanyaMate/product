import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoTrash } from 'react-icons/io5';
import { removeFileEffect } from '@/app/model/file-page/file-page.model.ts';


export type RemoveFilesButtonProps =
    {
        filesIds: string[];
    }
    & ButtonProps;

// TODO: Add endpoint to delete all by one request

export const RemoveFilesButton: FC<RemoveFilesButtonProps> = memo(function RemoveFilesButton (props) {
    const { filesIds, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => Promise.all(filesIds.map(removeFileEffect)) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoTrash/>
        </ButtonWithLoading>
    );
});