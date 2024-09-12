import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UsersSearchList.module.scss';
import {
    UserSearchItem,
} from '@/widgets/user/item/UserSearchItem/ui/UserSearchItem.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    searchUsersByLoginStartEffect,
    $usersSearch, $usersSearchIsPending,
} from '@/app/model/search/user-search.model.ts';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';


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
    const searchPending                                 = useStore($usersSearchIsPending);

    useEffect(() => {
        searchUsersByLoginStartEffect({ query, limit, offset });
    }, [ query, limit, offset ]);

    if (!searchUsers || searchPending) {
        return <Loader/>;
    }

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
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