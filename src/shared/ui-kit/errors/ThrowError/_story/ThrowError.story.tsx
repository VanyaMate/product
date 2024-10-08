import { Meta, StoryObj } from '@storybook/react';
import { ThrowError } from '../ui/ThrowError';


const meta: Meta<typeof ThrowError> = {
    title     : 'shared/ui-kit/errors/ThrowError',
    component : ThrowError,
    tags      : [ 'autodocs' ],
    decorators: [],
    argTypes  : {
        message: {
            control: {
                type   : 'text',
                default: 'Сообщение ошибки',
            },
        },
        trace  : {
            control: {
                type   : 'text',
                default: 'Место где произошла ошибка',
            },
        },
    },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'Сообщение об ошибке',
    },
};

export const WithTrance: Story = {
    args: {
        message: 'Сообщение об ошибке',
        trace  : 'Место где произошла ошибка',
    },
};

export default meta;