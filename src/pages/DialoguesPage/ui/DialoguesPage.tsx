import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useLayoutEffect,
} from 'react';
import {
    PrivateDialogue,
} from '@/entities/private-dialogues/item/PrivateDialogue/ui/PrivateDialogue.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { useParams } from 'react-router-dom';
import {
    SITE_ROUTE_PARAM_DIALOGUE_ID,
} from '@/app/routes/main-site/config/routes.tsx';
import classNames from 'classnames';
import css from './DialoguesPage.module.scss';
import {
    PrivateDialogueWindow,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/ui/PrivateDialogueWindow.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateDialogues,
    $privateDialoguesIsPending,
    getListPrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import {
    $privateMessages,
} from '@/app/model/private-messages/private-messages.model.ts';
import { useTranslation } from 'react-i18next';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    VirtualRenderMethod, VirtualType,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { Virtual } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    NoMoreDialogues,
} from '@/entities/dialogue/NoMoreDialogues/ui/NoMoreDialogues.tsx';


export type DialoguesPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DialoguesPage: FC<DialoguesPageProps> = memo(function DialoguesPage (props) {
    const { className, ...other }                  = props;
    const dialogues                                = useStore($privateDialogues);
    const dialoguesIsPending                       = useStore($privateDialoguesIsPending);
    const userData                                       = useStore($authUser);
    const { [SITE_ROUTE_PARAM_DIALOGUE_ID]: dialogueId } = useParams<{
        [SITE_ROUTE_PARAM_DIALOGUE_ID]: string
    }>();
    const messages                                       = useStore($privateMessages);

    useLayoutEffect(() => {
        // TODO: Temp
        getListPrivateDialogueEffect({ query: '', limit: 1000, offset: 0 });
    }, []);

    // Подгрузка для бандла
    useTranslation([ 'dialogue', 'friends-page', 'posts' ]);

    const dialoguesRender = useCallback<VirtualRenderMethod>((dialogue: DomainPrivateDialogueFull) => (
        <PrivateDialogue
            dialogue={ dialogue }
            key={ dialogue.id }
            lastMessage={ messages[dialogue.id]?.slice(-1)[0] }
            login={ userData.login }
            selected={ dialogueId === dialogue.id }
        />
    ), [ dialogueId, messages, userData.login ]);

    if (dialoguesIsPending && !dialogues.length) {
        return <PageLoader/>;
    }

    return (
        <Row { ...other }
             className={ classNames(css.container, {}, className) }>
            <Virtual
                className={ css.dialogues }
                contentClassName={ css.list }
                distanceToTrigger={ 100 }
                list={ dialogues }
                noMorePreviousElement={ <NoMoreDialogues/> }
                render={ dialoguesRender }
                showAmount={ 30 }
                type={ VirtualType.TOP }
            />
            <PrivateDialogueWindow dialogueId={ dialogueId }/>
        </Row>
    );
});