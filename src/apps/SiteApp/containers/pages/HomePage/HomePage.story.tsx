import { Meta, StoryObj } from '@storybook/react';
import HomePage from '@/apps/SiteApp/containers/pages/HomePage/HomePage.tsx';


HomePage.displayName = 'HomePage';

const meta: Meta<typeof HomePage> = {
    title    : 'apps/SiteApp/pages/HomePage',
    component: HomePage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;