import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    PrivateDialogue,
} from '@/entities/private-dialogues/item/PrivateDialogue/ui/PrivateDialogue.tsx';
import {
    privateDialoguesReducer,
} from '@/app/redux/slices/private-dialogues/slice/private-dialogues.slice.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    getListPrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getListPrivateDialogues/getListPrivateDialogues.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';


export type DialoguesPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DialoguesPage: FC<DialoguesPageProps> = memo(function DialoguesPage (props) {
    const { className, ...other } = props;
    const dialogues               = useAppSelector((state) => state.dialogues);
    const dispatch                = useAppDispatch();

    useReducerConnector('dialogues', privateDialoguesReducer);

    useEffect(() => {
        dispatch(getListPrivateDialogues({ offset: 0, limit: 10, query: '' }));
    }, [ dispatch ]);

    if (!dialogues || dialogues.isPending) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ className }
        >
            {
                dialogues.dialogues.map((dialogue) => (
                    <PrivateDialogue
                        dialogue={ dialogue }
                        key={ dialogue.id }
                        status={ dialogues.dialoguesStatus[dialogue.id] }
                    />
                ))
            }
        </div>
    );
});