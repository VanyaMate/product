import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useEffect,
} from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowHeader.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ArchivePrivateDialogue,
} from '@/features/private-dialogue/button/ArchivePrivateDialogue/ui/ArchivePrivateDialogue.tsx';
import {
    RemovePrivateDialogue,
} from '@/features/private-dialogue/button/RemovePrivateDialogue/ui/RemovePrivateDialogue.tsx';
import {
    ReadAllMessagesPrivateDialogue,
} from '@/features/private-dialogue/button/ReadAllMessagesPrivateDialogue/ui/ReadAllMessagesPrivateDialogue.tsx';
import {
    $privateMessagesIsPending,
    getPrivateMessagesByQueryEffect, resetPrivateMessagesSearchEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSearch } from 'react-icons/io5';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce.ts';


export type PrivateDialogueWindowHeaderProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowHeader: FC<PrivateDialogueWindowHeaderProps> = memo(function PrivateDialogueWindowHeader (props) {
    const { className, dialogueId, children, ...other } = props;
    const messagesStatus                                = useStore($privateMessagesIsPending);
    const { t }                                         = useTranslation();
    const debounce                                      = useDebounce(500);

    const onSearchHandler = useCallback((query: string) => {
        query
        ? getPrivateMessagesByQueryEffect([
            dialogueId, {
                query,
                limit : 20,
                offset: 0,
            },
        ])
        : resetPrivateMessagesSearchEffect(dialogueId);
    }, [ dialogueId ]);

    const { handleSubmit, register, reset } = useForm<{ search: string }>();

    useEffect(() => reset(), [ dialogueId, reset ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.sides }>
                <Row>
                    <ButtonWithLoading
                        disabled
                        loading={ messagesStatus[dialogueId] ?? false }
                        quad
                    >
                        <IoSearch/>
                    </ButtonWithLoading>
                    <search>
                        <form
                            onChange={ handleSubmit(({ search }) => debounce(() => onSearchHandler(search))) }>
                            <TextInput
                                placeholder={ t.page.dialogues.search_message }
                                type="text"
                                { ...register('search') }
                            />
                        </form>
                    </search>
                </Row>
                <Row>
                    <ReadAllMessagesPrivateDialogue dialogueId={ dialogueId }/>
                    <div className={ css.divider }/>
                    <ArchivePrivateDialogue dialogueId={ dialogueId }/>
                    <RemovePrivateDialogue dialogueId={ dialogueId }/>
                </Row>
            </div>
            <div className={ css.divider }/>
            { children }
        </div>
    );
});