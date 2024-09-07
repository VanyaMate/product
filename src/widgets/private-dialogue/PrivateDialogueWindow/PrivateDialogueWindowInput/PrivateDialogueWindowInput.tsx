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
import { IoSend } from 'react-icons/io5';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    getMessageTypeByBody,
} from '@/entities/message/lib/getMessageTypeByBody.ts';
import {
    sendPrivateMessageEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type PrivateDialogueWindowInputProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowInput: FC<PrivateDialogueWindowInputProps> = memo(function PrivateDialogueWindowInput (props) {
    const { className, dialogueId, ...other } = props;
    const { t }                               = useTranslation();
    const inputController                     = useInputWithError({ name: 'message' });
    const form                                = useForm<{ message: string }>({
        inputs  : [ inputController ],
        onSubmit: (data) => {
            if (data.message) {
                resetInput();
                return sendPrivateMessageEffect([
                    dialogueId, {
                        message    : data.message,
                        messageType: getMessageTypeByBody(data.message),
                    },
                ]).then();
            }
            return Promise.resolve();
        },
    });

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
            <Form className={ css.form } controller={ form }>
                <Row className={ css.interface }>
                    <InputWithError
                        autoComplete="off"
                        autoFocus
                        className={ css.input }
                        containerClassName={ css.inputContainer }
                        controller={ inputController }
                        placeholder={ t.page.dialogues.write_message }
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