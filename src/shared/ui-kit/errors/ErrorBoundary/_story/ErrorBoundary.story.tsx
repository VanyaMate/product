import { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from '@/shared/ui-kit';


const meta = {
    title    : 'shared/ui-kit/errors/ErrorBoundary',
    component: ErrorBoundary,
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutError: Story = {
    args: {
        children: <h1>Without Error</h1>,
    },
};

const ComponentWithError = () => {
    throw {
        message: 'Сообщение об ошибке',
    };
};

export const WithError: Story = {
    args: {
        children: <ComponentWithError/>,
    },
};