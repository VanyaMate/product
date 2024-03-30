import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';


Button.displayName = 'Button';

const meta = {
    title     : 'shared/Button',
    component : Button,
    tags      : [ 'autodocs' ],
    argTypes  : {
        styleType: {
            control: { type: 'select' },
            options: [
                ButtonStyleType.PRIMARY,
                ButtonStyleType.SECOND,
                ButtonStyleType.GHOST,
            ],
        },
    },
    args      : { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        styleType: ButtonStyleType.PRIMARY,
        children : 'Button',
    },
};

export const Secondary: Story = {
    args: {
        styleType: ButtonStyleType.SECOND,
        children : 'Button',
    },
};

export const Ghost: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        children : 'Button',
    },
};