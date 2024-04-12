import { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from '../ui/PageLoader';


const meta: Meta<typeof PageLoader> = {
    title    : 'shared/ui-kit/loaders/PageLoader',
    component: PageLoader,
    tags     : [ 'autodocs' ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
