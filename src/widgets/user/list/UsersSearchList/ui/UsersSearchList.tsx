import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UsersSearchList.module.scss';
import {
    UserSearchItem,
} from '@/widgets/user/item/UserSearchItem/ui/UserSearchItem.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $usersSearch,
    $usersSearchIsPending,
    searchUsersByLoginStartEffect,
} from '@/app/model/search/user-search.model.ts';
import {
    Divider,
    DividerType,
} from '@/shared/ui-kit/divider/Divider/ui/Divider.tsx';


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
        if (query) {
            searchUsersByLoginStartEffect({ query, limit, offset });
        }
    }, [ query, limit, offset ]);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <h3>Users</h3>
            <Divider type={ DividerType.HORIZONTAL }/>
            {
                searchPending ? 'Loading..' :
                !searchUsers.length ? 'No users' :
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