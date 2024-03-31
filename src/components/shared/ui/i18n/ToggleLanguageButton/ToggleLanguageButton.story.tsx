import { Meta, StoryObj } from '@storybook/react';
import ToggleLanguageButton
    from '@/components/shared/ui/i18n/ToggleLanguageButton/ToggleLanguageButton.tsx';
import {
    translationDecorator,
} from '../../../../../../.storybook/decorators/translation-decorator.tsx';


ToggleLanguageButton.displayName = 'ToggleLanguageButton';

const meta: Meta<typeof ToggleLanguageButton> = {
    title     : 'shared/i18n/ToggleLanguageButton',
    component : ToggleLanguageButton,
    tags      : [ 'autodocs' ],
    decorators: [ translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;