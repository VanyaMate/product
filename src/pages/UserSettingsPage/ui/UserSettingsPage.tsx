import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import {
    WorkInProgress,
} from '@/entities/site/WorkInProgress/ui/WorkInProgress.tsx';


export type UserSettingsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsPage: FC<UserSettingsPageProps> = memo(function UserSettingsPage (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames('', {}, [ className ]) }>
            <WorkInProgress/>
        </div>
    );
});