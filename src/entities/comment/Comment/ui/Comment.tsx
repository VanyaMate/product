import { ComponentPropsWithoutRef, FC, memo, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import css from './Comment.module.scss';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    UserAvatar,
    UserAvatarSize,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';


export type CommentProps =
    {
        comment: DomainComment;
        extraFooter?: ReactNode;
        extraHeader?: ReactNode;
    }
    & ComponentPropsWithoutRef<'article'>;

export const Comment: FC<CommentProps> = memo(function Comment (props) {
    const { className, comment, extraFooter, extraHeader, ...other } = props;

    const date = useMemo(() => new Date(comment.creationDate).toLocaleString(), [ comment.creationDate ]);

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row className={ css.main }>
                <UserAvatar
                    avatar={ comment.author.avatar }
                    login={ comment.author.login }
                    size={ UserAvatarSize.MEDIUM }
                />
                <div className={ css.right }>
                    <Row fullWidth spaceBetween>
                        <Link
                            to={ getUserPageUrl(comment.author.login) }
                        >
                            { comment.author.login }
                        </Link>
                        { extraHeader }
                    </Row>
                    <p>{ comment.comment }</p>
                    <Row fullWidth spaceBetween>
                        <time dateTime={ date }>{ date }</time>
                        { extraFooter }
                    </Row>
                </div>
            </Row>
        </article>
    );
});