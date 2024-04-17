import { Meta, StoryObj } from '@storybook/react';
import { ProfilePageAsync } from '@/pages/ProfilePage/ui/ProfilePage.async.tsx';


const meta: Meta<typeof ProfilePageAsync> = {
    title    : 'pages/ProfilePage',
    component: ProfilePageAsync,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


export default meta;