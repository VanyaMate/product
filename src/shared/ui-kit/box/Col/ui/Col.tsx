import {
    ComponentPropsWithoutRef,
    FC,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Col.module.scss';


export enum ColSize {
    SMALL  = 'small',
    MEDIUM = 'medium',
    LARGE  = 'large',
}

export type ColProps =
    {
        size?: ColSize
    }
    & ComponentPropsWithoutRef<'div'>;

export const Col: FC<ColProps> = memo(function Col (props) {
    const {
              className,
              size = ColSize.SMALL,
              ...other
          } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className, css[size] ]) }
        />
    );
});