import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMorePosts.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NoMorePostsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMorePosts: FC<NoMorePostsProps> = memo(function NoMorePosts (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t.page.posts.no_more_posts }
        </div>
    );
});