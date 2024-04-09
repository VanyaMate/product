import { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from '$/.storybook';
import { translationDecorator } from '$/.storybook';
import { ToggleThemeButton } from '../ui/ToggleThemeButton';


ToggleThemeButton.displayName = 'ToggleThemeButton';

const meta: Meta<typeof ToggleThemeButton> = {
    title     : 'app/theme/ToggleLanguageButton',
    component : ToggleThemeButton,
    tags      : [ 'autodocs' ],
    decorators: [ themeDecorator, translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;