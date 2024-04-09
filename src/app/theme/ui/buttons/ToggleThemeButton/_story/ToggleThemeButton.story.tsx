import { Meta, StoryObj } from '@storybook/react';
import ToggleThemeButton
    from '@/components/shared/ui/theme/ThemeContext/ui/ToggleThemeButton/ToggleThemeButton.tsx';
import {
    themeDecorator,
} from '../../../../../../../../.storybook/decorators/theme-decorator.tsx';
import {
    translationDecorator,
} from '../../../../../../../../.storybook/decorators/translation-decorator.tsx';


ToggleThemeButton.displayName = 'ToggleThemeButton';

const meta: Meta<typeof ToggleThemeButton> = {
    title     : 'shared/theme/ToggleLanguageButton',
    component : ToggleThemeButton,
    tags      : [ 'autodocs' ],
    decorators: [ themeDecorator, translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;