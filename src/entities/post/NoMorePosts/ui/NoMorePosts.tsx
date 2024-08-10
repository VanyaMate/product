import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMorePosts.module.scss';
import { useTranslation } from 'react-i18next';


export type NoMorePostsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMorePosts: FC<NoMorePostsProps> = memo(function NoMorePosts (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'posts' ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t('no_more_posts') }
        </div>
    );
});