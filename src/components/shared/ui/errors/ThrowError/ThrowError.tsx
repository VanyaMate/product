import React from 'react';
import classNames from 'classnames';
import css from './ThrowError.module.scss';
import { useTranslation } from 'react-i18next';


export type ThrowErrorProps =
    {
        message: string;
        trace: string;
    }
    & React.ComponentPropsWithoutRef<'div'>;

const ThrowError: React.FC<ThrowErrorProps> = (props) => {
    const { message, trace, className, ...other } = props;
    const { t }                                   = useTranslation();

    return (
        <div { ...other } className={ classNames(css.container, {}, [ className ]) }>
            <h3>{ t('error_boundary_title') }</h3>
            <p className={ css.error }>{ message }</p>
            <p className={ css.trace }>{ trace }</p>
        </div>
    );
};

export default React.memo(ThrowError);