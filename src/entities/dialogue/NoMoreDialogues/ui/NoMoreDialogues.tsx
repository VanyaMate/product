import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreDialogues.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NoMoreDialoguesProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreDialogues: FC<NoMoreDialoguesProps> = memo(function NoMoreDialogues (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t.page.dialogues.no_more_dialogues }
        </div>
    );
});