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
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSend } from 'react-icons/io5';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    getMessageTypeByBody,
} from '@/entities/message/lib/getMessageTypeByBody.ts';
import {
    sendPrivateMessageEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';


export type PrivateDialogueWindowInputProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowInput: FC<PrivateDialogueWindowInputProps> = memo(function PrivateDialogueWindowInput (props) {
    const { className, dialogueId, ...other }                    = props;
    const { t }                                                  = useTranslation();
    const { register, handleSubmit, reset, formState, setFocus } = useForm<
        { message: string }
    >();

    const onSendMessage = useCallback((message: string) => {
        return sendPrivateMessageEffect([
            dialogueId, {
                message    : message,
                messageType: getMessageTypeByBody(message),
            },
        ]).then(() => reset());
    }, [ dialogueId, reset ]);

    useEffect(() => {
        reset();
        setTimeout(() => {
            setFocus('message');
        });
    }, [ dialogueId, reset, setFocus ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <form
                className={ css.form }
                onSubmit={ handleSubmit(({ message }) => onSendMessage(message)) }>
                <TextInput
                    autoComplete="off"
                    autoFocus
                    className={ css.input }
                    containerClassName={ css.inputContainer }
                    placeholder={ t.page.dialogues.write_message }
                    type="text"
                    {
                        ...register('message', {
                            minLength: 1, maxLength: 255, required: true,
                        })
                    }
                />
                <ButtonWithLoading
                    disabled={ !formState.isValid }
                    loading={ formState.isSubmitting }
                    quad
                    size={ ButtonSizeType.LARGE }
                    type="submit"
                >
                    <IoSend/>
                </ButtonWithLoading>
            </form>
        </div>
    );
});