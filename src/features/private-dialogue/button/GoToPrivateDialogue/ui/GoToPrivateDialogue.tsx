import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './GoToPrivateDialogue.module.scss';
import {
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoChatbox } from 'react-icons/io5';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useStore } from '@vanyamate/sec-react';
import { $friendsList } from '@/app/model/friends/friends.model.ts';
import {
    createPrivateDialogueEffect,
    $privateDialogueWithUser,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    getDialoguePageUrl,
} from '@/features/routes/lib/getDialoguePageUrl.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type GoToPrivateDialogueProps =
    {
        userId: string;
        permissions: DomainUserPermissionsPrivateDialogue;
    }
    & ButtonProps;

export const GoToPrivateDialogue: FC<GoToPrivateDialogueProps> = memo(function GoToPrivateDialogue (props) {
    const { className, userId, permissions, ...other } = props;
    const friends                                      = useStore($friendsList);
    const dialogueWithUser                             = useStore($privateDialogueWithUser);
    const navigate                                     = useNavigate();
    const { t }                                        = useTranslation();

    // if exist
    if (dialogueWithUser[userId]?.created) {
        return (
            <PopOver popover={ t.page.dialogues.open_dialogue }>
                <Button
                    aria-label={ t.page.dialogues.open_dialogue }
                    onClick={ () => navigate(getDialoguePageUrl(dialogueWithUser[userId].dialogueId)) }
                    quad
                    styleType={ ButtonStyleType.SECOND }
                >
                    <IoChatbox/>
                </Button>
            </PopOver>
        );
    }

    const isCreatableDialogue = permissions === DomainUserPermissionsPrivateDialogue.ALL
                                ? true
                                : permissions === DomainUserPermissionsPrivateDialogue.FRIENDS
                                  ? friends.some((friend) => friend.id === userId)
                                  : false;

    return (
        <PopOver popover={ t.page.dialogues.create_dialogue }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t.page.dialogues.create_dialogue }
                className={ classNames(css.container, {}, [ className ]) }
                disabled={ !isCreatableDialogue }
                onClick={ () => createPrivateDialogueEffect(userId).then((dialogue) => navigate(getDialoguePageUrl(dialogue.dialogue.id))) }
                quad
            >
                <IoChatbox/>
            </ButtonWithLoading>
        </PopOver>
    );
});