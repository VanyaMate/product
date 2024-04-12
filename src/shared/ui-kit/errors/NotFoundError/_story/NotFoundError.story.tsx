import { Meta, StoryObj } from '@storybook/react';
import { NotFoundError } from '../ui/NotFoundError';
import { translationDecorator } from '$/.storybook';


const meta: Meta<typeof NotFoundError> = {
    title     : 'shared/ui-kit/errors/NotFoundError',
    component : NotFoundError,
    tags      : [ 'autodocs' ],
    decorators: [ translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;