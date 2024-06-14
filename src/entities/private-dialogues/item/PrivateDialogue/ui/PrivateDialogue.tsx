import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogue.module.scss';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    PrivateDialogueIcon,
} from '@/entities/private-dialogues/icon/PrivateDialogueIcon/ui/PrivateDialogueIcon.tsx';
import { IoArchive, IoTrashBin } from 'react-icons/io5';
import {
    PrivateDialogueMessagePreview,
} from '@/entities/private-dialogues/item/PrivateDialogueMessagePreview/ui/PrivateDialogueMessagePreview.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';


export type PrivateDialogueProps =
    {
        dialogue: DomainPrivateDialogueFull;
        status: ThunkState;
        login: string;
        selected: boolean;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PrivateDialogue: FC<PrivateDialogueProps> = memo(function PrivateDialogue (props) {
    const { className, dialogue, status, selected, login, ...other } = props;

    console.log(status);

    return (
        <article
            { ...other }
            className={ classNames(css.container, { [css.selected]: selected }, [ className ]) }
        >
            <Link className={ css.link } to={ `/dialogue/${ dialogue.id }` }>
                <PrivateDialogueIcon
                    className={ css.image }
                    dialogueAvatar={ dialogue.avatar }
                    dialogueTitle={ dialogue.title }
                    userAvatar={ dialogue.user.avatar }
                    userLogin={ dialogue.user.login }
                />
                <div className={ css.content }>
                    <header className={ css.header }>
                        <h3 className={ css.title }>{ dialogue.title || dialogue.user.login }</h3>
                        <div className={ css.status }>
                            { dialogue.companionArchived
                              ? <IoArchive className={ css.item }/> : null }
                            { dialogue.companionDeleted
                              ? <IoTrashBin className={ css.item }/> : null }
                            { dialogue.meArchived
                              ? <IoArchive className={ css.item_me }/> : null }
                        </div>
                    </header>
                    <PrivateDialogueMessagePreview
                        login={ login }
                        message={ dialogue.messages[dialogue.messages.length - 1] }
                        selected={ selected }
                    />
                </div>
            </Link>
        </article>
    );
});