import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './CallPreview.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { DomainCall } from 'product-types/dist/call/DomainCall';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCall, IoClose } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type CallPreviewProps =
    {
        userId: string;
        call: DomainCall;
        acceptCall: () => Promise<void>;
        cancelCall: () => Promise<void>;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CallPreview: FC<CallPreviewProps> = memo(function CallPreview (props) {
    const { userId, acceptCall, cancelCall, call, className, ...other } = props;

    return (
        <Row
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            fullWidth
            spaceBetween
        >
            <Row>
                <UserAvatar
                    avatar={ call.user.avatar }
                    className={ css.avatar }
                    login={ call.user.login }/>
                <span
                    className={ css.login }
                >{ call.user.login + call.user.login + call.user.login + call.user.login + call.user.login + call.user.login + call.user.login }</span>
            </Row>
            <Row>
                {
                    call.initiatorId !== userId
                    ? <ButtonWithLoading
                        onClick={ acceptCall }
                        styleType={ ButtonStyleType.SECOND }
                    >
                        <IoCall/>
                    </ButtonWithLoading>
                    : null
                }
                <ButtonWithLoading
                    onClick={ cancelCall }
                    styleType={ ButtonStyleType.DANGER }
                >
                    <IoClose/>
                </ButtonWithLoading>
            </Row>
        </Row>
    );
});