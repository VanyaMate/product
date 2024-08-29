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
    $usersSearch, $usersSearchCount, $usersSearchError, $usersSearchIsPending,
} from '@/app/model/search/user-search.model.ts';


// TODO

export type UsersSearchListProps =
    {
        query: string,
        limit: number;
        offset: number;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UsersSearchList: FC<UsersSearchListProps> = memo(function UsersSearchList (props) {
    const { query, limit, offset, className, ...other } = props;
    const searchUsers                                   = useStore($usersSearch);
    const searchCount                                   = useStore($usersSearchCount);
    const searchPending                                 = useStore($usersSearchIsPending);
    const searchError                                   = useStore($usersSearchError);

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
            <p>query: { query }</p>
            <p>limit: { limit }</p>
            <p>offset: { offset }</p>
            <p>pending: { searchPending.toString() }</p>
            <p>error: { JSON.stringify(searchError) ?? 'null' }</p>
            <p>count: { searchCount }</p>
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