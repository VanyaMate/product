import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../ui/Button';
import { ButtonSizeType, ButtonStyleType } from '../types/types';


const meta = {
    title    : 'shared/ui-kit/buttons/Button',
    component: Button,
    tags     : [ 'autodocs' ],
    args     : {
        onClick : fn(),
        children: 'Button',
    },
    argTypes : {
        size     : {
            options: Object.values(ButtonSizeType),
            control: { type: 'select' },
        },
        styleType: {
            options: Object.values(ButtonStyleType),
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <Button
            size={ args.size }
            styleType={ args.styleType }
        >
            { args.children }
        </Button>
    ),
};

export const Primary: Story = {
    args: {
        styleType: ButtonStyleType.PRIMARY,
    },
};

export const Secondary: Story = {
    args: {
        styleType: ButtonStyleType.SECOND,
    },
};

export const Ghost: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
    },
};

export const Small: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        size     : ButtonSizeType.SMALL,
    },
};

export const Medium: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        size     : ButtonSizeType.MEDIUM,
    },
};

export const Large: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        children : 'Button',
        size     : ButtonSizeType.LARGE,
    },
};

export const Quad: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        quad     : true,
    },
};