import { Meta, StoryObj } from '@storybook/react';
import PageLoader from '@/components/shared/ui/loaders/PageLoader/PageLoader.tsx';


PageLoader.displayName = 'PageLoader';

const meta: Meta<typeof PageLoader> = {
    title    : 'shared/loaders/PageLoader',
    component: PageLoader,
    tags     : [ 'autodocs' ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
