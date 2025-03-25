import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithLoading } from '../ui/ButtonWithLoading';
import { Col } from '../../../box/Col/ui/Col.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';


const meta = {
    title    : 'shared/ui-kit/buttons/ButtonWithLoading',
    component: ButtonWithLoading,
    tags     : [ 'autodocs' ],
    args     : {
        children: 'Button',
    },
    argTypes : {
        size     : {
            options: Object.values(ButtonSizeType),
            control: { type: 'select' },
        },
        styleType: {
            options: Object.values(ButtonStyleType),
            control: { type: 'select' },
        },
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
                size={ args.size }
                styleType={ args.styleType }
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
                size={ ButtonSizeType.LARGE }
                styleType={ ButtonStyleType.GHOST }
            >
                { args.children }
            </ButtonWithLoading>
            <ButtonWithLoading
                loading={ args.loading }
                size={ ButtonSizeType.SMALL }
                styleType={ ButtonStyleType.DANGER }
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