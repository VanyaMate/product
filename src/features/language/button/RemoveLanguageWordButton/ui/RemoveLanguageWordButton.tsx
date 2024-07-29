import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoTrash } from 'react-icons/io5';
import {
    removeLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type RemoveLanguageWordButtonProps =
    {
        wordId: string;
    }
    & ButtonProps;

export const RemoveLanguageWordButton: FC<RemoveLanguageWordButtonProps> = memo(function RemoveLanguageWordButton (props) {
    const { wordId, ...other } = props;
    const { t }                = useTranslation([ 'languages' ]);

    return (
        <PopOver popover={ t('remove_word') }>
            <ButtonWithLoading
                { ...other }
                onClick={ async () => removeLanguageWordEffect(wordId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoTrash/>
            </ButtonWithLoading>
        </PopOver>
    );
});