import { Meta, StoryObj } from '@storybook/react';
import AboutPage from '@/apps/SiteApp/containers/pages/AboutPage/AboutPage.tsx';


AboutPage.displayName = 'AboutPage';

const meta: Meta<typeof AboutPage> = {
    title    : 'apps/SiteApp/pages/AboutPage',
    component: AboutPage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;