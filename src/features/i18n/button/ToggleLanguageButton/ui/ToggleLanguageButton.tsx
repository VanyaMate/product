import { FC, memo, useCallback, useMemo } from 'react';
import { IoLanguage } from 'react-icons/io5';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type ToggleLanguageButtonProps = {};

export const ToggleLanguageButton: FC<ToggleLanguageButtonProps> = memo(function ToggleLanguageButton (props) {
    const {}                   = props;
    const { t, set, language } = useTranslation();
    const isRuEng              = useMemo(() => language === 'ru', [ language ]);

    const toggleLanguage = useCallback(() => {
        set(isRuEng ? 'en' : 'ru');
    }, [ isRuEng, set ]);

    return (
        <PopOver popover={ t.app.toggle_language_aria_button }>
            <Button
                aria-label={ t.app.toggle_language_aria_button }
                onClick={ toggleLanguage }
                quad
                styleType={ ButtonStyleType.GHOST }
            >
                <IoLanguage/>
            </Button>
        </PopOver>
    );
});