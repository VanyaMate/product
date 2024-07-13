import { ComponentPropsWithoutRef, FC, memo, useState } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindow.module.scss';
import {
    PrivateDialogueWindowHeader,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowHeader/ui/PrivateDialogueWindowHeader.tsx';
import {
    PrivateDialogueWindowInput,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowInput/PrivateDialogueWindowInput.tsx';
import {
    NoSelectDialogue,
} from '@/entities/private-dialogues/NoSelectDialogue/ui/NoSelectDialogue.tsx';
import {
    PrivateDialogueWindowUserPreview,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowUserPreview/ui/PrivateDialogueWindowUserPreview.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoClose, IoPerson } from 'react-icons/io5';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateDialoguesStatus,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import {
    PrivateMessagesVirtualContainer,
} from '@/widgets/message/PrivateMessageVirtualContainer/ui/PrivateMessageVirtualContainer.tsx';
import { useTranslation } from 'react-i18next';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type PrivateDialogueWindowProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindow: FC<PrivateDialogueWindowProps> = memo(function PrivateDialogueWindow (props) {
    const { className, dialogueId, ...other }     = props;
    const [ rightMenuOpened, setRightMenuOpened ] = useState<boolean>(false);
    const dialogues                               = useStore($privateDialoguesStatus);
    const { t }                                   = useTranslation([ 'dialogue' ]);

    if (!dialogueId || !dialogues[dialogueId]) {
        return (
            <NoSelectDialogue/>
        );
    }

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.container_opened]: rightMenuOpened }, [ className ]) }
        >
            <div className={ css.leftSide }>
                <PrivateDialogueWindowHeader
                    className={ css.header }
                    dialogueId={ dialogueId }
                >
                    <PopOver popover={ t(
                        rightMenuOpened
                        ? 'hide_interlocutor'
                        : 'show_interlocutor',
                    ) }
                    >
                        <Button
                            aria-label={ t(
                                rightMenuOpened
                                ? 'hide_interlocutor'
                                : 'show_interlocutor',
                            ) }
                            onClick={ () => setRightMenuOpened(prev => !prev) }
                            quad
                        >
                            { rightMenuOpened ? <IoClose/> : <IoPerson/> }
                        </Button>
                    </PopOver>
                </PrivateDialogueWindowHeader>
                <PrivateMessagesVirtualContainer
                    className={ css.messages }
                    dialogueId={ dialogueId }
                />
                <PrivateDialogueWindowInput
                    className={ css.input }
                    dialogueId={ dialogueId }
                />
            </div>
            <div className={ css.rightSide }>
                <div className={ css.content }>
                    <PrivateDialogueWindowUserPreview
                        dialogueId={ dialogueId }
                        opened={ true }
                    />
                </div>
            </div>
        </div>
    );
});