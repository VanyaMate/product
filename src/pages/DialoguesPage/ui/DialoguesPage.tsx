import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import {
    PrivateDialogue,
} from '@/entities/private-dialogues/item/PrivateDialogue/ui/PrivateDialogue.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { useParams } from 'react-router-dom';
import {
    SITE_ROUTE_DIALOGUE_ID,
} from '@/app/routes/main-site/config/routes.tsx';
import classNames from 'classnames';
import css from './DialoguesPage.module.scss';
import {
    PrivateDialogueWindow,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/ui/PrivateDialogueWindow.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    getOnePrivateDialogueEffect,
    privateDialogues, privateDialoguesIsPending, privateDialoguesStatus,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { authUser } from '@/app/model/auth/auth.model.ts';
import {
    privateMessagesList,
} from '@/app/model/private-messages/private-messages.model.ts';


export type DialoguesPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DialoguesPage: FC<DialoguesPageProps> = memo(function DialoguesPage (props) {
    const { className, ...other }                  = props;
    const dialogues                                = useStore(privateDialogues);
    const dialoguesStatus                          = useStore(privateDialoguesStatus);
    const dialoguesIsPending                       = useStore(privateDialoguesIsPending);
    const userData                                 = useStore(authUser);
    const { [SITE_ROUTE_DIALOGUE_ID]: dialogueId } = useParams<{
        [SITE_ROUTE_DIALOGUE_ID]: string
    }>();
    const messages                                 = useStore(privateMessagesList);

    useEffect(() => {
        if (dialogueId) {
            getOnePrivateDialogueEffect(dialogueId);
        }
    }, [ dialogueId ]);

    if (!dialogues || (dialoguesIsPending && !messages[dialogueId]) || (dialogueId && !messages[dialogueId])) {
        return <PageLoader/>;
    }

    return (
        <Row { ...other }
             className={ classNames(css.container, {}, className) }>
            <Col className={ css.dialogues }>
                {
                    dialogues.map((dialogue) => (
                        <PrivateDialogue
                            dialogue={ dialogue }
                            key={ dialogue.id }
                            lastMessage={ messages[dialogue.id]?.messages.slice(-1)[0] }
                            login={ userData.login }
                            selected={ dialogueId === dialogue.id }
                            status={ dialoguesStatus[dialogue.id] }
                        />
                    ))
                }
            </Col>
            <PrivateDialogueWindow dialogueId={ dialogueId }/>
        </Row>
    );
});