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
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getFriendsList,
} from '@/app/redux/slices/friends/selectors/getFriendsList/getFriendsList.ts';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    createPrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/createPrivateDialogue/createPrivateDialogue.ts';


export type GoToPrivateDialogueProps =
    {
        userId: string;
        permissions: DomainUserPermissionsPrivateDialogue;
    }
    & ButtonProps;

export const GoToPrivateDialogue: FC<GoToPrivateDialogueProps> = memo(function GoToPrivateDialogue (props) {
    const { className, userId, permissions, ...other } = props;
    const dispatch                                     = useAppDispatch();
    const friends                                      = useAppSelector(getFriendsList);
    const privateDialogueState                         = useAppSelector((state) => state.dialogues);
    const navigate                                     = useNavigate();

    // if not exist
    if (privateDialogueState.withUser[userId]?.created) {
        return (
            <Button
                onClick={ () => navigate(`/dialogue/${ privateDialogueState.dialogues.find((dialogue) => dialogue.user.id === userId).id }`) }
                quad
                styleType={ ButtonStyleType.SECOND }
            >
                <IoChatbox/>
            </Button>
        );
    }

    const isCreatableDialogue = permissions === DomainUserPermissionsPrivateDialogue.ALL
                                ? true
                                : permissions === DomainUserPermissionsPrivateDialogue.FRIENDS
                                  ? friends.some((friend) => friend.id === userId)
                                  : false;

    return (
        <ButtonWithLoading
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            disabled={ !isCreatableDialogue }
            onClick={ () => dispatch(createPrivateDialogue(userId)).unwrap().then((dialogue) => navigate(`/dialogue/${ dialogue.dialogue.id }`)) }
            quad
        >
            <IoChatbox/>
        </ButtonWithLoading>
    );
});