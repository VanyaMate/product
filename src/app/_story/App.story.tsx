import { Meta, StoryObj } from '@storybook/react';
import { App } from '../ui/app.tsx';


const meta: Meta<typeof App> = {
    title    : 'apps/App',
    component: App,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;