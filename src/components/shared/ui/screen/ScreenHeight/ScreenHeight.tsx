import React from 'react';
import css from './ScreenHeight.module.scss';
import classNames from 'classnames';


export type ScreenHeightProps =
    {
        footer?: React.ReactNode;
    }
    & React.ComponentPropsWithoutRef<'div'>;

const ScreenHeight: React.FC<ScreenHeightProps> = (props) => {
    const { className, children, footer, ...other } = props;

    return (
        <div { ...other } className={ classNames(css.container, {}, [ className ]) }>
            <div>
                { children }
            </div>
            {
                footer
            }
        </div>
    );
};

export default React.memo(ScreenHeight);