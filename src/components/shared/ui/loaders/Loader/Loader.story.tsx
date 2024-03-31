import { Meta, StoryObj } from '@storybook/react';
import Loader from '@/components/shared/ui/loaders/Loader/Loader.tsx';


Loader.displayName = 'Loader';

const meta: Meta<typeof Loader> = {
    title    : 'shared/loaders/Loader',
    component: Loader,
    tags     : [ 'autodocs' ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
