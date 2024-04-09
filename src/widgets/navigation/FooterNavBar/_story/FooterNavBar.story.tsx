import { Meta, StoryObj } from '@storybook/react';
import { FooterNavBar } from '../ui/FooterNavBar';


const meta: Meta<typeof FooterNavBar> = {
    title    : 'widgets/FooterNavBar',
    component: FooterNavBar,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;