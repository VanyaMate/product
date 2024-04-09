import { Meta, StoryObj } from '@storybook/react';
import { HomePage } from '@/pages';


const meta: Meta<typeof HomePage> = {
    title    : 'pages/HomePage',
    component: HomePage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;