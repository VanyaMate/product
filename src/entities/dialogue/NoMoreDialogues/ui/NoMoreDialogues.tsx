import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreDialogues.module.scss';
import { useTranslation } from 'react-i18next';


export type NoMoreDialoguesProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreDialogues: FC<NoMoreDialoguesProps> = memo(function NoMoreDialogues (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'dialogue' ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t('no_more_dialogues') }
        </div>
    );
});