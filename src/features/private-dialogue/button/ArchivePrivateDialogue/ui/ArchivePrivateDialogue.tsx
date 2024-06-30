import { FC, memo, useMemo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoArchive, IoArchiveOutline } from 'react-icons/io5';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    archivePrivateDialogueEffect,
    privateDialogues, unArchivePrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


export type ArchivePrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const ArchivePrivateDialogue: FC<ArchivePrivateDialogueProps> = memo(function ArchivePrivateDialogue (props) {
    const { className, dialogueId, ...other } = props;
    const dialogues                           = useStore(privateDialogues);
    const inArchive                           = useMemo(() => dialogues.find((dialogue) => dialogue.id === dialogueId).meArchived, [ dialogueId, dialogues ]);

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => inArchive
                            ? unArchivePrivateDialogueEffect(dialogueId)
                            : archivePrivateDialogueEffect(dialogueId) }
            quad
            styleType={ inArchive ? ButtonStyleType.PRIMARY
                                  : ButtonStyleType.GHOST }
        >
            { inArchive ? <IoArchive/> : <IoArchiveOutline/> }
        </ButtonWithLoading>
    );
});