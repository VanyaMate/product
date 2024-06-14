import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    PrivateDialogue,
} from '@/entities/private-dialogues/item/PrivateDialogue/ui/PrivateDialogue.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { useParams } from 'react-router-dom';
import {
    SITE_ROUTE_DIALOGUE_ID,
} from '@/app/routes/main-site/config/routes.tsx';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    getOnePrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getOnePrivateDialogues/getOnePrivateDialogues.ts';
import classNames from 'classnames';
import css from './DialoguesPage.module.scss';
import { Message } from '@/entities/message/item/Message/ui/Message.tsx';


export type DialoguesPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DialoguesPage: FC<DialoguesPageProps> = memo(function DialoguesPage (props) {
    const { className, ...other }                  = props;
    const dialogues                                = useAppSelector((state) => state.dialogues);
    const userData                                 = useAppSelector(getAuthUser);
    const { [SITE_ROUTE_DIALOGUE_ID]: dialogueId } = useParams<{
        [SITE_ROUTE_DIALOGUE_ID]: string
    }>();
    const dispatch                                 = useAppDispatch();

    useEffect(() => {
        dispatch(getOnePrivateDialogues(dialogueId));
    }, [ dialogueId, dispatch ]);

    if (!dialogues || dialogues.isPending) {
        return <PageLoader/>;
    }

    return (
        <Row { ...other }
             className={ classNames(css.container, {}, className) }>
            <Col className={ css.dialogues }>
                {
                    dialogues.dialogues.map((dialogue) => (
                        <PrivateDialogue
                            dialogue={ dialogue }
                            key={ dialogue.id }
                            login={ userData.login }
                            selected={ dialogueId === dialogue.id }
                            status={ dialogues.dialoguesStatus[dialogue.id] }
                        />
                    ))
                }
            </Col>
            {
                dialogueId ? <Col className={ css.messages }>
                    {
                        dialogues
                            .dialogues
                            .find((dialogue) => dialogue.id === dialogueId)
                            .messages
                            .map((message) =>
                                <Message
                                    key={ message.id }
                                    message={ message }
                                    userId={ userData.id }
                                />,
                            )
                    }
                </Col> : 'Select dialogue'
            }
        </Row>
    );
});