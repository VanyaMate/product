import { Meta, StoryObj } from '@storybook/react';
import { ScreenHeight } from '../ui/ScreenHeight';


const meta: Meta<typeof ScreenHeight> = {
    title    : 'shared/screen/ScreenHeight',
    component: ScreenHeight,
    tags     : [ 'autodocs' ],
    argTypes : {
        children: {
            control: { type: 'text' },
        },
        footer  : {
            control: { type: 'text' },
        },
    },
};

type Story = StoryObj<typeof ScreenHeight>;

export const OnlyChildren: Story = {
    args: {
        children: <h1>Header</h1>,
    },
};


export const WithFooter: Story = {
    args: {
        children: <h1>Header</h1>,
        footer  : <h2>Footer</h2>,
    },
};

export default meta;