import { Meta, StoryObj } from '@storybook/react';
import SiteApp from '@/apps/SiteApp/SiteApp.tsx';


SiteApp.displayName = 'SiteApp';

const meta: Meta<typeof SiteApp> = {
    title    : 'apps/SiteApp',
    component: SiteApp,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;