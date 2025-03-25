import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithLoading } from '../ui/ButtonWithLoading';
import { Col } from '../../../box/Col/ui/Col.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


const meta = {
    title    : 'shared/ui-kit/buttons/ButtonWithLoading',
    component: ButtonWithLoading,
    tags     : [ 'autodocs' ],
    args     : {
        children: 'Button',
    },
} satisfies Meta<typeof ButtonWithLoading>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {};

export const Loading: Story = {
    render: (args) => (
        <Col>
            <ButtonWithLoading
                loading={ args.loading }
            >
                { args.children }
            </ButtonWithLoading>
            <ButtonWithLoading
                loading={ args.loading }
                quad
            >
                ♥
            </ButtonWithLoading>
            <ButtonWithLoading
                loading={ args.loading }
                styleType={ ButtonStyleType.GHOST }
            >
                { args.children }
            </ButtonWithLoading>
        </Col>
    ),
    args  : {
        loading : true,
        children: 'Загрузить',
    },
};