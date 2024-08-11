import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserNotificationsSettingsContainer.module.scss';
import {
    WorkInProgress,
} from '@/entities/site/WorkInProgress/ui/WorkInProgress.tsx';


export type UserNotificationsSettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserNotificationsSettingsContainer: FC<UserNotificationsSettingsContainerProps> = memo(function UserNotificationsSettingsContainer (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <WorkInProgress/>
        </div>
    );
});