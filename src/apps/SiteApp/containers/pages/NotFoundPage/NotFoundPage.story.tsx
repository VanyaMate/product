import { Meta, StoryObj } from '@storybook/react';
import NotFoundPage from '@/apps/SiteApp/containers/pages/NotFoundPage/NotFoundPage.tsx';


NotFoundPage.displayName = 'NotFoundPage';

const meta: Meta<typeof NotFoundPage> = {
    title    : 'apps/SiteApp/pages/NotFoundPage',
    component: NotFoundPage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;