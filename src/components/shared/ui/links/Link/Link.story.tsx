import { Meta, StoryObj } from '@storybook/react';
import Link from '@/components/shared/ui/links/Link/Link.tsx';
import { LinkStyleType } from '@/components/shared/ui/links/Link/types/types.ts';
import {
    routerDecorator,
} from '../../../../../../.storybook/decorators/router-decorator.tsx';


Link.displayName = 'Link';

const meta: Meta<typeof Link> = {
    title     : 'shared/links/Link',
    component : Link,
    tags      : [ 'autodocs' ],
    argTypes  : {
        styleType: {
            control: {
                type: 'select',
            },
            options: [
                LinkStyleType.PRIMARY,
                LinkStyleType.SECOND,
                LinkStyleType.GHOST,
            ],
        },
        to       : {
            control: {
                default: '#',
                type   : 'text',
            },
        },
        children : {
            control: {
                default: 'Link',
                type   : 'text',
            },
        },
    },
    decorators: [ routerDecorator ],
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        to      : '#',
        children: 'Link',
    },
};

export const Second: Story = {
    args: {
        to       : '#',
        children : 'Link',
        styleType: LinkStyleType.SECOND,
    },
};

export const Ghost: Story = {
    args: {
        to       : '#',
        children : 'Link',
        styleType: LinkStyleType.GHOST,
    },
};

export default meta;