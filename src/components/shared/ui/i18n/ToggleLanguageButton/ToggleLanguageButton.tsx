import React from 'react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { useTranslation } from 'react-i18next';


export type ToggleLanguageButtonProps = {};

const ToggleLanguageButton: React.FC<ToggleLanguageButtonProps> = (props) => {
    const {}          = props;
    const { t, i18n } = useTranslation();

    const toggleLanguage = function () {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            aria-label={ t('toggle_language_aria_button') }
            onClick={ toggleLanguage }
        >
            { t('toggle_language_button') }
        </Button>
    );
};

export default React.memo(ToggleLanguageButton);