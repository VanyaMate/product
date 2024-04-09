import { Meta, StoryObj } from '@storybook/react';
import { AboutPage } from '../ui/AboutPage';


const meta: Meta<typeof AboutPage> = {
    title    : 'pages/AboutPage',
    component: AboutPage,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;