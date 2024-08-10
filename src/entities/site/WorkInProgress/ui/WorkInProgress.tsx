import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './WorkInProgress.module.scss';
import { useTranslation } from 'react-i18next';
import { IoSettings } from 'react-icons/io5';


export type WorkInProgressProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const WorkInProgress: FC<WorkInProgressProps> = memo(function WorkInProgress (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <IoSettings className={ css.icon }/>
            <p className={ css.text }>{ t('work_in_progress') }</p>
        </div>
    );
});