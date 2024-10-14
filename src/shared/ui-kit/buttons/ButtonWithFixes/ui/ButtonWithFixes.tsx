import { memo, FC, ReactNode } from 'react';
import classNames from 'classnames';
import css from './ButtonWithFixes.module.scss';
import { Button, ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type ButtonWithFixesProps =
    {
        pref?: ReactNode;
        post?: ReactNode;
    }
    & ButtonProps;

export const ButtonWithFixes: FC<ButtonWithFixesProps> = memo(function ButtonWithFixes (props) {
    const { pref, post, children, className, ...other } = props;

    return (
        <Button { ...other } className={ classNames(css.container, {}, [ className ]) }>
            { pref ? <span className={ css.section }>{ pref }</span> : null }
            { children ? <span className={ css.section }>{ children }</span> : null }
            { post ? <span className={ css.section }>{ post }</span> : null }
        </Button>
    );
});