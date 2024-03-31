import { Meta, StoryObj } from '@storybook/react';
import FooterNavBar
    from '@/apps/SiteApp/containers/widgets/navigation/FooterNavBar/FooterNavBar.tsx';


FooterNavBar.displayName = 'FooterNavBar';

const meta: Meta<typeof FooterNavBar> = {
    title    : 'apps/SiteApp/widgets/FooterNavBar',
    component: FooterNavBar,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;