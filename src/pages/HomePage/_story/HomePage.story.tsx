import { Meta, StoryObj } from '@storybook/react';
import { HomePageAsync } from '@/pages/HomePage/ui/HomePage.async.tsx';


const meta: Meta<typeof HomePageAsync> = {
    title    : 'pages/HomePage',
    component: HomePageAsync,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};


export default meta;