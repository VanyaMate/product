import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UsersSearchList.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    searchUsersReducer,
} from '@/app/redux/slices/searchUsers/slice/searchUsersSchema.ts';
import {
    fetchSearchUsersByLoginStart,
} from '@/app/redux/slices/searchUsers/thunks/fetchProfilesByLoginStart.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    UserSearchItem,
} from '@/widgets/user/item/UserSearchItem/ui/UserSearchItem.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


export type UsersSearchListProps =
    {
        query: string,
        limit: number;
        offset: number;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UsersSearchList: FC<UsersSearchListProps> = memo(function UsersSearchList (props) {
    const { query, limit, offset, className, ...other } = props;
    const searchUsers                                   = useAppSelector((state) => state.searchUsers);
    const dispatch                                      = useAppDispatch();

    useEffect(() => {
        dispatch(
            fetchSearchUsersByLoginStart({ query, limit, offset }),
        );
    }, [ query, limit, offset, dispatch ]);
    useReducerConnector('searchUsers', searchUsersReducer);

    if (!searchUsers) {
        return <PageLoader/>;
    }

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>query: { searchUsers.query }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>limit: { searchUsers.limit }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>offset: { searchUsers.offset }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>pending: { searchUsers.isPending.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>error: { searchUsers.error?.toString() ?? 'null' }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>count: { searchUsers.count }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>items: { searchUsers.users.length }</p>
            {
                searchUsers.users.map((user) => (
                    <UserSearchItem key={ user.id } user={ user }/>
                ))
            }
        </section>
    );
});