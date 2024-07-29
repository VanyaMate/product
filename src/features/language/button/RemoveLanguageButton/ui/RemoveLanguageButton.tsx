import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCheckmark, IoTrash } from 'react-icons/io5';
import { removeLanguageEffect } from '@/app/model/languages/languages.model.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';


export type RemoveLanguageButtonProps =
    {
        languageId: string;
    }
    & ButtonProps;

export const RemoveLanguageButton: FC<RemoveLanguageButtonProps> = memo(function RemoveLanguageButton (props) {
    const { languageId, ...other } = props;
    const { t }                    = useTranslation([ 'languages' ]);
    const dropdownController       = useDropdownController();

    return (
        <PopOver popover={ t('remove_language') }>
            <Dropdown controller={ dropdownController } dropdownContent={
                <PopOver popover={ t('remove_language') }>
                    <ButtonWithLoading
                        { ...other }
                        onClick={ async () => removeLanguageEffect(languageId) }
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