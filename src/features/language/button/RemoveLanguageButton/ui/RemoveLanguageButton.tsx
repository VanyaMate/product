import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoTrash } from 'react-icons/io5';
import { removeLanguageEffect } from '@/app/model/languages/languages.model.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type RemoveLanguageButtonProps =
    {
        languageId: string;
    }
    & ButtonProps;

export const RemoveLanguageButton: FC<RemoveLanguageButtonProps> = memo(function RemoveLanguageButton (props) {
    const { languageId, ...other } = props;
    const { t }                    = useTranslation([ 'languages' ]);

    return (
        <PopOver popover={ t('remove_language') }>
            <ButtonWithLoading
                { ...other }
                onClick={ async () => removeLanguageEffect(languageId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoTrash/>
            </ButtonWithLoading>
        </PopOver>
    );
});