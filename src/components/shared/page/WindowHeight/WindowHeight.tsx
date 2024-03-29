import React from 'react';
import css from './WindowHeight.module.scss';
import classNames from 'classnames';


export type WindowHeightProps =
    {}
    & React.ComponentPropsWithoutRef<'div'>;

const WindowHeight: React.FC<WindowHeightProps> = (props) => {
    const { className, ...other } = props;

    return (
        <div { ...other } className={ classNames(css.container, {}, [ className ]) }/>
    );
};

export default React.memo(WindowHeight);