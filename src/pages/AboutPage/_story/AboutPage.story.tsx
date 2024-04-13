import { Meta, StoryObj } from '@storybook/react';
import { AboutPageAsync } from '../ui/AboutPage.async.tsx';


const meta: Meta<typeof AboutPageAsync> = {
    title    : 'pages/AboutPage',
    component: AboutPageAsync,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;