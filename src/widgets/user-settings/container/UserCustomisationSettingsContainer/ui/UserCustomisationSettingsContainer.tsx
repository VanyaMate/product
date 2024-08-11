import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserCustomisationSettingsContainer.module.scss';
import {
    WorkInProgress,
} from '@/entities/site/WorkInProgress/ui/WorkInProgress.tsx';


export type UserCustomisationSettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserCustomisationSettingsContainer: FC<UserCustomisationSettingsContainerProps> = memo(function UserCustomisationSettingsContainer (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <WorkInProgress/>
        </div>
    );
});