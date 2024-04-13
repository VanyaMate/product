import { Meta, StoryObj } from '@storybook/react';
import { NotFoundPage } from '../ui/NotFoundPage.tsx';


const meta: Meta<typeof NotFoundPage> = {
    title    : 'pages/NotFoundPage',
    component: NotFoundPage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;