import { Decorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import { i18nConfig } from '@/app';


export const translationDecorator: Decorator = (StoryFn, context) => {
    const { globals: { i18n } } = context;

    i18nConfig.changeLanguage(i18n);

    return <Suspense fallback={ 'loading..' }>
        <I18nextProvider i18n={ i18nConfig }>
            <StoryFn/>
        </I18nextProvider>
    </Suspense>;
};
