import React from 'react';
import Button, { ButtonProps } from '@/components/shared/ui/buttons/Button/Button.tsx';
import classNames from 'classnames';
import css from './ButtonWithIcon.module.scss';


export type ButtonWithIconProps =
    {
        pref?: React.ReactNode;
        post?: React.ReactNode;
    }
    & ButtonProps;

const ButtonWithIcon: React.FC<ButtonWithIconProps> = (props) => {
    const { pref, post, children, className, ...other } = props;

    return (
        <Button { ...other } className={ classNames(css.container, {}, [ className ]) }>
            {
                pref
            }
            {
                children
            }
            {
                post
            }
        </Button>
    );
};

export default React.memo(ButtonWithIcon);