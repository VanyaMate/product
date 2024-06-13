import { ComponentPropsWithoutRef, FC, memo } from 'react';
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


export type DialoguesPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DialoguesPage: FC<DialoguesPageProps> = memo(function DialoguesPage (props) {
    const { className, ...other } = props;
    const dialogues               = useAppSelector((state) => state.dialogues);
    const userData                = useAppSelector(getAuthUser);

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
                        login={ userData.login }
                        status={ dialogues.dialoguesStatus[dialogue.id] }
                    />
                ))
            }
        </div>
    );
});