import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    UserContainer,
} from '@/widgets/user/containers/UserContainer/ui/UserContainer.tsx';


export type PrivateDialogueWindowUserPreviewProps =
    {
        dialogueId: string;
        opened: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowUserPreview: FC<PrivateDialogueWindowUserPreviewProps> = memo(function PrivateDialogueWindowUserPreview (props) {
    const { dialogueId } = props;
    // TODO
    const user           = useAppSelector((state) => state.dialogues).dialogues.find((dialogue) => dialogue.id === dialogueId).user.login;

    return (
        <UserContainer login={ user }/>
    );
});