import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowInput.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    sendPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/sendPrivateMessage.ts';
import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import { IoSend } from 'react-icons/io5';


export type PrivateDialogueWindowInputProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowInput: FC<PrivateDialogueWindowInputProps> = memo(function PrivateDialogueWindowInput (props) {
    const { className, dialogueId, ...other } = props;
    const inputController                     = useInputWithError({ name: '' });
    const dispatch                            = useAppDispatch();

    useEffect(() => {
        inputController.inputRef.current.value = '';
        inputController.value.current          = '';
    }, [ dialogueId, inputController.inputRef, inputController.value ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row>
                <InputWithError controller={ inputController }/>
                <ButtonWithLoading
                    onClick={ () => dispatch(sendPrivateMessage([ dialogueId, {
                        message    : inputController.value.current,
                        messageType: DomainMessageType.TEXT,
                    } ])) }
                    quad
                >
                    <IoSend/>
                </ButtonWithLoading>
            </Row>
        </div>
    );
});