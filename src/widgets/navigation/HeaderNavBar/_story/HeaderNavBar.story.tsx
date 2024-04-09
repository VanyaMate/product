import { Meta, StoryObj } from '@storybook/react';
import HeaderNavBar
    from '@/apps/SiteApp/containers/widgets/navigation/HeaderNavBar/HeaderNavBar.tsx';
import {
    routerDecorator,
} from '../../../../../../../.storybook/decorators/router-decorator.tsx';
import {
    translationDecorator,
} from '../../../../../../../.storybook/decorators/translation-decorator.tsx';


HeaderNavBar.displayName = 'HeaderNavBar';

const meta: Meta<typeof HeaderNavBar> = {
    title     : 'apps/SiteApp/widgets/HeaderNavBar',
    component : HeaderNavBar,
    decorators: [ routerDecorator, translationDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;