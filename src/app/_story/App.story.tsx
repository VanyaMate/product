import { Meta, StoryObj } from '@storybook/react';
import RootApp from '@/apps/RootApp/ui/App.tsx';


RootApp.displayName = 'RootApp';

const meta: Meta<typeof RootApp> = {
    title    : 'apps/App',
    component: RootApp,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;