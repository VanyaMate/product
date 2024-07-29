import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoTrash } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    removeLanguageFolderEffect,
} from '@/app/model/languages/languages.model.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type RemoveLanguageFolderButtonProps =
    {
        folderId: string;
    }
    & ButtonProps;

export const RemoveLanguageFolderButton: FC<RemoveLanguageFolderButtonProps> = memo(function RemoveLanguageFolderButton (props) {
    const { folderId, ...other } = props;
    const { t }                  = useTranslation([ 'languages' ]);

    return (
        <PopOver popover={ t('remove_folder') }>
            <ButtonWithLoading
                { ...other }
                onClick={ async () => removeLanguageFolderEffect(folderId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoTrash/>
            </ButtonWithLoading>
        </PopOver>
    );
});