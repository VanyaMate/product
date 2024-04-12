import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UserHeaderProfileButton } from '../ui/UserHeaderProfileButton.tsx';


const meta = {
    title    : 'entities/user/button/UserHeaderProfileButton',
    component: UserHeaderProfileButton,
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
} satisfies Meta<typeof UserHeaderProfileButton>;

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