import { Meta, StoryObj } from '@storybook/react';
import NotFoundError from '@/components/shared/ui/errors/NotFoundError/NotFoundError.tsx';
import {
    translationDecorator,
} from '../../../../../../.storybook/decorators/translation-decorator.tsx';


NotFoundError.displayName = 'NotFoundError';

const meta: Meta<typeof NotFoundError> = {
    title     : 'shared/errors/NotFoundError',
    component : NotFoundError,
    tags      : [ 'autodocs' ],
    decorators: [ translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;