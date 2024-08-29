import { Meta, StoryObj } from '@storybook/react';
import { NotFoundError } from '@/shared/ui-kit/errors/NotFoundError/ui/NotFoundError.tsx';


const meta: Meta<typeof NotFoundError> = {
    title     : 'shared/ui-kit/errors/NotFoundError',
    component : NotFoundError,
    tags      : [ 'autodocs' ],
    decorators: [],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;