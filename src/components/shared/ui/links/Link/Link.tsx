import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import css from './Link.module.scss';
import { LinkStyleType } from '@/components/shared/ui/links/Link/types/types.ts';


export type LinkProps =
    {
        styleType?: LinkStyleType
    }
    & RouterLinkProps;

const Link: React.FC<LinkProps> = (props) => {
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
};

export default React.memo(Link);