import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserPrivacySettingsContainer.module.scss';
import {
    WorkInProgress,
} from '@/entities/site/WorkInProgress/ui/WorkInProgress.tsx';


export type UserPrivacySettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserPrivacySettingsContainer: FC<UserPrivacySettingsContainerProps> = memo(function UserPrivacySettingsContainer (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <WorkInProgress/>
        </div>
    );
});