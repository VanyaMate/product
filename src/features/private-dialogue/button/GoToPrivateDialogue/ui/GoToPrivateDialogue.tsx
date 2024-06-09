import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './GoToPrivateDialogue.module.scss';
import {
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    ButtonWithLoading, ButtonWithLoadingProps,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type GoToPrivateDialogueProps =
    {
        userId: string;
        permissions: DomainUserPermissionsPrivateDialogue;
    }
    & ButtonWithLoadingProps;

export const GoToPrivateDialogue: FC<GoToPrivateDialogueProps> = memo(function GoToPrivateDialogue (props) {
    const { className, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            //
        </ButtonWithLoading>
    );
});