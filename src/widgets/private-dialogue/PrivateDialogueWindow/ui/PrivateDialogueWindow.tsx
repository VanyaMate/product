import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
    useState,
} from 'react';
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
    $privateDialogues,
    $privateDialoguesStatus,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    PrivateMessagesInfinityVirtualContainer,
} from '@/widgets/message/PrivateMessagesInfinityVirtualContainer/ui/PrivateMessagesInfinityVirtualContainer.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { inert } from '@/shared/lib/react/inert.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


export type PrivateDialogueWindowProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindow: FC<PrivateDialogueWindowProps> = memo(function PrivateDialogueWindow (props) {
    const { className, dialogueId, ...other }     = props;
    const [ rightMenuOpened, setRightMenuOpened ] = useState<boolean>(false);
    const dialogues                               = useStore($privateDialogues);
    const dialoguesStatus                         = useStore($privateDialoguesStatus);
    const { t, replace }                          = useTranslation();
    const setTitle                                = useTitle(t.app.dialogues_page);
    const dialogueNotSelected                     = !dialogueId || !dialoguesStatus[dialogueId];

    useLayoutEffect(() => {
        if (!dialogueNotSelected) {
            const dialogue      = dialogues.find((dialogue) => dialogue.id === dialogueId);
            const dialogueTitle = dialogue.title || dialogue.user.login;

            setTitle(
                replace(
                    t.app.dialogue_page,
                    {
                        dialogue_name: dialogueTitle,
                    },
                ),
            );
        } else {
            setTitle(t.app.dialogues_page);
        }
    }, [ dialogueId, dialogueNotSelected, dialogues, replace, setTitle, t.app.dialogue_page, t.app.dialogues_page ]);

    if (dialogueNotSelected) {
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
                    <PopOver popover={
                        t.page.dialogues[rightMenuOpened ? 'hide_interlocutor'
                                                         : 'show_interlocutor']
                    }
                    >
                        <Button
                            aria-label={
                                t.page.dialogues[rightMenuOpened
                                                 ? 'hide_interlocutor'
                                                 : 'show_interlocutor']
                            }
                            onClick={ () => setRightMenuOpened(prev => !prev) }
                            quad
                        >
                            { rightMenuOpened ? <IoClose/> : <IoPerson/> }
                        </Button>
                    </PopOver>
                </PrivateDialogueWindowHeader>
                <PrivateMessagesInfinityVirtualContainer
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
                        { ...inert(!rightMenuOpened) }
                    />
                </div>
            </div>
        </div>
    );
});