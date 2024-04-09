import { Decorator } from '@storybook/react';
import '../../src/shared/styles/index.scss';
import { ThemeProvider } from '../../src/app';


export const themeDecorator: Decorator = (StoryFn, context) => {
    const { globals: { theme } } = context;

    return (
        <ThemeProvider
            withStorage={ false }
            style={ {
                position      : 'absolute',
                top           : 0,
                left          : 0,
                width         : '100%',
                height        : '100%',
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
            } }
            defaultTheme={ theme }
        >
            <StoryFn/>
        </ThemeProvider>
    );
};