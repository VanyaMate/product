import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react';
import { ButtonWithFixes } from '../ui/ButtonWithFixes';
import { ButtonStyleType } from '@/shared/ui-kit';


const meta = {
    title    : 'shared/ui-kit/buttons/ButtonWithFixes',
    component: ButtonWithFixes,
    tags     : [ 'autodocs' ],
    args     : { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPrefix: Story = {
    args: {
        styleType: ButtonStyleType.PRIMARY,
        pref     : '<-',
        children : 'Button',
    },
};

export const WithPostfix: Story = {
    args: {
        styleType: ButtonStyleType.SECOND,
        post     : '->',
        children : 'Button',
    },
};

export const WithBoth: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        pref     : '<-',
        post     : '->',
        children : 'Button',
    },
};