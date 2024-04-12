import { Meta, StoryObj } from '@storybook/react';
import { translationDecorator } from '$/.storybook';
import { ToggleLanguageButton } from '../ui/ToggleLanguageButton';


const meta: Meta<typeof ToggleLanguageButton> = {
    title     : 'features/i18n/button/ToggleLanguageButton',
    component : ToggleLanguageButton,
    tags      : [ 'autodocs' ],
    decorators: [ translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;