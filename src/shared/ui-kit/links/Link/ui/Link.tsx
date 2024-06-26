import { FC, memo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import css from './Link.module.scss';
import { LinkStyleType } from '../types/types.ts';


export type LinkProps =
    {
        styleType?: LinkStyleType
    }
    & RouterLinkProps;

export const Link: FC<LinkProps> = memo(function Link (props) {
    const {
              styleType = LinkStyleType.PRIMARY,
              className,
              ...other
          } = props;

    return (
        <RouterLink
            { ...other }
            className={ classNames(css.container, {}, [ className, css[styleType] ]) }
        />
    );
});