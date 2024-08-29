import { ComponentPropsWithoutRef, memo, FC } from 'react';
import classNames from 'classnames';
import css from './ThrowError.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type ThrowErrorProps =
    {
        message: string;
        trace: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ThrowError: FC<ThrowErrorProps> = memo(function ThrowError (props) {
    const { message, trace, className, ...other } = props;
    const { t }                                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <h3>{ t.app.error_boundary_title }</h3>
            <p className={ css.error }>{ message }</p>
            <p className={ css.trace }>{ trace }</p>
        </div>
    );
});