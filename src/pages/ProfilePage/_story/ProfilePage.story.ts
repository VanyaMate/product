import { Meta, StoryObj } from '@storybook/react';
import { UserPageAsync } from '@/pages/ProfilePage/ui/UserPageAsync.tsx';


const meta: Meta<typeof UserPageAsync> = {
    title    : 'pages/ProfilePage',
    component: UserPageAsync,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


export default meta;