import { Meta, StoryObj } from '@storybook/react';
import { HeaderNavBar } from '../ui/HeaderNavBar';
import { translationDecorator } from '$/.storybook';
import { routerDecorator } from '$/.storybook';


const meta: Meta<typeof HeaderNavBar> = {
    title     : 'widgets/HeaderNavBar',
    component : HeaderNavBar,
    decorators: [ routerDecorator, translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;