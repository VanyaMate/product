import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useEffect,
} from 'react';
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
import { IoSend } from 'react-icons/io5';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useTranslation } from 'react-i18next';
import {
    getMessageTypeByBody,
} from '@/entities/message/lib/getMessageTypeByBody.ts';


export type PrivateDialogueWindowInputProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowInput: FC<PrivateDialogueWindowInputProps> = memo(function PrivateDialogueWindowInput (props) {
    const { className, dialogueId, ...other } = props;
    const { t }                               = useTranslation([ 'dialogue' ]);
    const inputController                     = useInputWithError({ name: 'message' });
    const form                                = useForm<{ message: string }>({
        inputs  : [ inputController ],
        onSubmit: (data) => dispatch(sendPrivateMessage([ dialogueId, {
            message    : data.message,
            messageType: getMessageTypeByBody(data.message),
        } ])).then(resetInput),
    });
    const dispatch                            = useAppDispatch();

    const resetInput = useCallback(() => {
        inputController.inputRef.current.value = '';
        inputController.value.current          = '';
    }, [ inputController.inputRef, inputController.value ]);

    useEffect(() => {
        resetInput();
    }, [ dialogueId, resetInput ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Form controller={ form }>
                <Row>
                    <InputWithError
                        className={ css.input }
                        controller={ inputController }
                        placeholder={ t('write_message') }
                    />
                    <ButtonWithLoading
                        loading={ form.pending }
                        quad
                        size={ ButtonSizeType.LARGE }
                        type="submit"
                    >
                        <IoSend/>
                    </ButtonWithLoading>
                </Row>
            </Form>
        </div>
    );
});