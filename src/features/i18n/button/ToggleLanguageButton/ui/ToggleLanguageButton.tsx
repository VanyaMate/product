import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui-kit';
import { IoLanguage } from 'react-icons/io5';


export type ToggleLanguageButtonProps = {};

export const ToggleLanguageButton: FC<ToggleLanguageButtonProps> = memo(function ToggleLanguageButton (props) {
    const {}          = props;
    const { t, i18n } = useTranslation();
    const isRuEng     = useMemo(() => i18n.resolvedLanguage === 'ru', [ i18n.resolvedLanguage ]);

    const toggleLanguage = useCallback(() => {
        i18n.changeLanguage(isRuEng ? 'en' : 'ru');
    }, [ isRuEng ]);

    return (
        <Button
            aria-label={ t('toggle_language_aria_button') }
            onClick={ toggleLanguage }
            quad
        >
            <IoLanguage/>
        </Button>
    );
});