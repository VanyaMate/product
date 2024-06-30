import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UsersSearchList.module.scss';
import {
    UserSearchItem,
} from '@/widgets/user/item/UserSearchItem/ui/UserSearchItem.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    searchUsersByLoginStartEffect,
    usersSearch, usersSearchCount, usersSearchError, usersSearchIsPending,
} from '@/app/model/search/user-search.model.ts';


export type UsersSearchListProps =
    {
        query: string,
        limit: number;
        offset: number;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UsersSearchList: FC<UsersSearchListProps> = memo(function UsersSearchList (props) {
    const { query, limit, offset, className, ...other } = props;
    const searchUsers                                   = useStore(usersSearch);
    const searchCount                                   = useStore(usersSearchCount);
    const searchPending                                 = useStore(usersSearchIsPending);
    const searchError                                   = useStore(usersSearchError);

    useEffect(() => {
        searchUsersByLoginStartEffect({ query, limit, offset });
    }, [ query, limit, offset ]);

    if (!searchUsers) {
        return <PageLoader/>;
    }

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>query: { query }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>limit: { limit }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>offset: { offset }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>pending: { searchPending.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>error: { JSON.stringify(searchError) ?? 'null' }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>count: { searchCount }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>items: { searchUsers.length }</p>
            {
                searchUsers.map((user) => (
                    <UserSearchItem
                        key={ user.id }
                        permissions={ user.permissions }
                        user={ user }
                    />
                ))
            }
        </section>
    );
});