import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui-kit';


export type ToggleLanguageButtonProps = {};

export const ToggleLanguageButton: FC<ToggleLanguageButtonProps> = memo(function ToggleLanguageButton (props) {
    const {}          = props;
    const { t, i18n } = useTranslation();

    console.log('i18n.language', i18n, i18n.language);

    const toggleLanguage = function () {
        i18n.changeLanguage(i18n.resolvedLanguage === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            aria-label={ t('toggle_language_aria_button') }
            onClick={ toggleLanguage }
        >
            { t('toggle_language_button') }
        </Button>
    );
});