import React from 'react';
import Button, { ButtonProps } from '@/components/shared/ui/buttons/Button/Button.tsx';
import classNames from 'classnames';
import css from './ButtonWithFixes.module.scss';


export type ButtonWithFixesProps =
    {
        pref?: React.ReactNode;
        post?: React.ReactNode;
    }
    & ButtonProps;

const ButtonWithFixes: React.FC<ButtonWithFixesProps> = (props) => {
    const { pref, post, children, className, ...other } = props;

    return (
        <Button { ...other } className={ classNames(css.container, {}, [ className ]) }>
            { pref ? <span className={ css.item }>{ pref }</span> : null }
            { children ? <span className={ css.item }>{ children }</span> : null }
            { post ? <span className={ css.item }>{ post }</span> : null }
        </Button>
    );
};

export default React.memo(ButtonWithFixes);