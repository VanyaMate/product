import { Decorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { i18nStoryConfig } from '../i18n/config.ts';
import { Suspense } from 'react';


export const translationDecorator: Decorator = (StoryFn) =>
    <Suspense fallback={ 'loading..' }>
        <I18nextProvider i18n={ i18nStoryConfig }>
            <StoryFn/>
        </I18nextProvider>;
    </Suspense>;