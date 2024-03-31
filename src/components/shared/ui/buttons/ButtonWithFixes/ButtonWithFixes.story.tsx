import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';
import type { StoryObj } from '@storybook/react';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';
import { fn } from '@storybook/test';
import ButtonStory from '@/components/shared/ui/buttons/Button/Button.story.tsx';


ButtonWithFixes.displayName = 'ButtonWithFixes';

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