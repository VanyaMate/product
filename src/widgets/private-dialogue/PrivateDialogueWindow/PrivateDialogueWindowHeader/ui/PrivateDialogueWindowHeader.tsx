import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowHeader.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
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
    getPrivateMessagesByQueryEffect, resetPrivateMessagesSearchEffect,
} from '@/app/model/private-messages/private-messages.model.ts';


export type PrivateDialogueWindowHeaderProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowHeader: FC<PrivateDialogueWindowHeaderProps> = memo(function PrivateDialogueWindowHeader (props) {
    const { className, dialogueId, children, ...other } = props;
    const search                                        = useInputWithError({
        name           : '',
        debounce       : 500,
        onChangeHandler: (query) => {
            query
            ? getPrivateMessagesByQueryEffect([ dialogueId, {
                query,
                limit : 20,
                offset: 0,
            } ])
            : resetPrivateMessagesSearchEffect(dialogueId);
        },
    });

    useEffect(() => {
        // TODO: Temp
        search.inputRef.current.value = '';
        search.value.current          = '';
    }, [ dialogueId, search.inputRef, search.value ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.sides }>
                <Row>
                    <InputWithError controller={ search }/>
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