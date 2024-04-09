import ButtonStory from '@/shared/ui-kit/buttons/Button/_story/Button.story.tsx';
import { fn } from '@storybook/test';
import { StoryObj } from '@storybook/react';
import { ButtonWithFixes } from '../ui/ButtonWithFixes';
import { ButtonStyleType } from '@/shared/ui-kit';


const meta = {
    title    : 'shared/buttons/ButtonWithFixes',
    component: ButtonWithFixes,
    argTypes : {
        ...ButtonStory.argTypes,
        post: { control: { type: 'text' } },
        pref: { control: { type: 'text' } },
    },
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