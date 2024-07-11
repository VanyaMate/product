import { ComponentPropsWithoutRef, FC, memo, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import css from './Post.module.scss';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';
import { getUserPageLinkAria } from '@/app/i18n/lib/getUserPageLinkAria.ts';
import {
    getDeltaByDates,
} from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates.ts';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates.ts';


export type PostProps =
    {
        post: DomainPost;
        extra?: ReactNode;
        footer?: ReactNode;
    }
    & ComponentPropsWithoutRef<'article'>;

export const Post: FC<PostProps> = memo(function Post (props) {
    const { post, extra, footer, className, ...other } = props;

    const date = useMemo(() => getStringDeltaByDates(getDeltaByDates(post.creationData, Date.now())), [ post.creationData ]);

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <header className={ css.header }>
                <div className={ css.info }>
                    <UserAvatar
                        avatar={ post.author.avatar }
                        className={ css.avatar }
                        login={ post.author.login }
                    />
                    <div className={ css.details }>
                        <Link
                            aria-label={ getUserPageLinkAria(post.author.login) }
                            to={ getUserPageUrl(post.author.login) }
                        >
                            { post.author.login }
                        </Link>
                        <p className={ css.date }>{ date }</p>
                    </div>
                </div>
                { extra }
            </header>
            <section className={ css.content }>
                { post.message }
            </section>
            { footer }
        </article>
    );
});