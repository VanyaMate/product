import { BrowserRouter } from 'react-router-dom';
import { Decorator } from '@storybook/react';


export const routerDecorator: Decorator = (StoryFn) =>
    <BrowserRouter><StoryFn/></BrowserRouter>;