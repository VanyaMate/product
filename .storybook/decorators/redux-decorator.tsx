import { Provider } from 'react-redux';
import { createGlobalStore } from '../../src/app';
import { Decorator } from '@storybook/react';


export const reduxDecorator: Decorator = (Story) =>
    <Provider store={ createGlobalStore() }>
        <Story/>
    </Provider>;