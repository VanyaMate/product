import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoClose } from 'react-icons/io5';
import { unselectFilesEffect } from '@/app/model/file-page/file-page.model.ts';


export type UnselectAllFilesButtonProps =
    {}
    & ButtonProps;

export const UnselectAllFilesButton: FC<UnselectAllFilesButtonProps> = memo(function UnselectAllFilesButton (props) {
    const { ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ unselectFilesEffect }
            quad
        >
            <IoClose/>
        </ButtonWithLoading>
    );
});