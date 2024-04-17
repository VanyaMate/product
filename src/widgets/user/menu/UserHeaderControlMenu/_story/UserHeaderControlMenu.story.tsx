import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UserHeaderControlMenu } from '../ui/UserHeaderControlMenu.tsx';


const meta = {
    title    : 'entities/user/button/UserHeaderControlMenu',
    component: UserHeaderControlMenu,
    tags     : [ 'autodocs' ],
    argTypes : {
        user: {
            id      : '1',
            username: 'User123',
        },
    },
    args     : {
        onClick: fn(),
    },
} satisfies Meta<typeof UserHeaderControlMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        user   : {
            id      : '1',
            username: 'User123',
        },
        onClick: fn(),
    },
};