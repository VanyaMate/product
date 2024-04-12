import { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../ui/Loader';


Loader.displayName = 'Loader';

const meta: Meta<typeof Loader> = {
    title    : 'shared/ui-kit/loaders/Loader',
    component: Loader,
    tags     : [ 'autodocs' ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
