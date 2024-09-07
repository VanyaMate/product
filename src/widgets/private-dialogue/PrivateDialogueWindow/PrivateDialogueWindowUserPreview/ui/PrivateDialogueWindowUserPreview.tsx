import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    UserContainer,
} from '@/widgets/user/containers/UserContainer/ui/UserContainer.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateDialogues,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


export type PrivateDialogueWindowUserPreviewProps =
    {
        dialogueId: string;
        opened: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowUserPreview: FC<PrivateDialogueWindowUserPreviewProps> = memo(function PrivateDialogueWindowUserPreview (props) {
    const { dialogueId, ...other } = props;
    // TODO
    const login                    = useStore($privateDialogues).find(({ id }) => id === dialogueId)?.user.login;

    return (
        <UserContainer { ...other } login={ login }/>
    );
});