import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogue.module.scss';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    PrivateDialogueIcon,
} from '@/entities/private-dialogues/icon/PrivateDialogueIcon/ui/PrivateDialogueIcon.tsx';
import {
    IoArchive,
    IoMail,
    IoTrashBin,
} from 'react-icons/io5';
import {
    PrivateDialogueMessagePreview,
} from '@/entities/private-dialogues/item/PrivateDialogueMessagePreview/ui/PrivateDialogueMessagePreview.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SITE_ROUTE_PARAM_DIALOGUE_ID,
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';


export type PrivateDialogueProps =
    {
        dialogue: DomainPrivateDialogueFull;
        lastMessage: DomainMessage;
        login: string;
        selected: boolean;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PrivateDialogue: FC<PrivateDialogueProps> = memo(function PrivateDialogue (props) {
    const {
              className,
              dialogue,
              lastMessage,
              selected,
              login,
              ...other
          } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, { [css.selected]: selected }, [ className ]) }
        >
            <Link className={ css.link }
                  to={ getRouteUrl(SiteAppRoutePath[SiteAppRoute.DIALOGUE], {
                      [SITE_ROUTE_PARAM_DIALOGUE_ID]: dialogue.id,
                  }) }>
                <PrivateDialogueIcon
                    className={ css.image }
                    dialogueAvatar={ dialogue.avatar }
                    dialogueTitle={ dialogue.title }
                    online={ dialogue.user.online }
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
                            { lastMessage && !lastMessage.read && lastMessage.author.login !== login && !selected
                              ? <IoMail
                                  className={ css.item_message }
                              /> : null
                            }
                        </div>
                    </header>
                    <PrivateDialogueMessagePreview
                        login={ login }
                        message={ lastMessage }
                        selected={ selected }
                    />
                </div>
            </Link>
        </article>
    );
});