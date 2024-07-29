import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCheckmark, IoTrash } from 'react-icons/io5';
import {
    removeLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';


export type RemoveLanguageWordButtonProps =
    {
        wordId: string;
    }
    & ButtonProps;

export const RemoveLanguageWordButton: FC<RemoveLanguageWordButtonProps> = memo(function RemoveLanguageWordButton (props) {
    const { wordId, ...other } = props;
    const { t }                = useTranslation([ 'languages' ]);
    const dropdownController   = useDropdownController();

    return (
        <PopOver popover={ t('remove_word') }>
            <Dropdown controller={ dropdownController } dropdownContent={
                <PopOver popover={ t('remove_word') }>
                    <ButtonWithLoading
                        { ...other }
                        onClick={ async () => removeLanguageWordEffect(wordId) }
                        quad
                        styleType={ ButtonStyleType.DANGER }
                    >
                        <IoCheckmark/>
                    </ButtonWithLoading>
                </PopOver>
            }>
                <Button quad styleType={ ButtonStyleType.GHOST }>
                    <IoTrash/>
                </Button>
            </Dropdown>
        </PopOver>
    );
});