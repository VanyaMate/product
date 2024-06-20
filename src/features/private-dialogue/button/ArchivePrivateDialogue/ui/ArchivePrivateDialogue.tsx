import { FC, memo, useMemo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoArchive, IoArchiveOutline } from 'react-icons/io5';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    archivePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/archivePrivateDialogue/archivePrivateDialogue.ts';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    unArchivePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/unArchivePrivateDialogue/unArchivePrivateDialogue.ts';


export type ArchivePrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const ArchivePrivateDialogue: FC<ArchivePrivateDialogueProps> = memo(function ArchivePrivateDialogue (props) {
    const { className, dialogueId, ...other } = props;
    const dialogues                           = useAppSelector((state) => state.dialogues);
    const dispatch                            = useAppDispatch();
    const inArchive                           = useMemo(() => dialogues.dialogues.find((dialogue) => dialogue.id === dialogueId).meArchived, [ dialogueId, dialogues.dialogues ]);

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => inArchive
                            ? dispatch(unArchivePrivateDialogue(dialogueId))
                            : dispatch(archivePrivateDialogue(dialogueId)) }
            quad
            styleType={ inArchive ? ButtonStyleType.PRIMARY
                                  : ButtonStyleType.GHOST }
        >
            { inArchive ? <IoArchive/> : <IoArchiveOutline/> }
        </ButtonWithLoading>
    );
});