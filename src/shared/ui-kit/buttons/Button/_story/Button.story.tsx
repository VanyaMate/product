import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../ui/Button';
import { ButtonSizeType, ButtonStyleType } from '../types/types';


const meta = {
    title    : 'shared/ui-kit/buttons/Button',
    component: Button,
    tags     : [ 'autodocs' ],
    args     : { onClick: fn() },
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

export const Small: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        children : 'Button',
        size     : ButtonSizeType.SMALL,
    },
};

export const Medium: Story = {
    args: {
        styleType: ButtonStyleType.GHOST,
        children : 'Button',
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
        children : 'B',
        quad     : true,
    },
};