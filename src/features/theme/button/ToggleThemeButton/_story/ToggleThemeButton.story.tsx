import { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from '$/.storybook';
import { ToggleThemeButton } from '../ui/ToggleThemeButton';


const meta: Meta<typeof ToggleThemeButton> = {
    title     : 'features/theme/button/ToggleLanguageButton',
    component : ToggleThemeButton,
    tags      : [ 'autodocs' ],
    decorators: [ themeDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;