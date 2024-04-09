import { Meta, StoryObj } from '@storybook/react';
import { Link } from '../ui/Link';
import { LinkStyleType } from '../types/types';
import { routerDecorator } from '$/.storybook';


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

export default meta;
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