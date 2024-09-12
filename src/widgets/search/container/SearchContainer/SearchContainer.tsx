import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './SearchContainer.module.scss';
import {
    UsersSearchList,
} from '@/widgets/user/list/UsersSearchList/ui/UsersSearchList.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';


export type SearchContainerProps =
    {
        query: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const SearchContainer: FC<SearchContainerProps> = memo(function SearchContainer (props) {
    const { query, className, ...other } = props;

    return (
        <Col { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <UsersSearchList limit={ 10 } offset={ 0 } query={ query }/>
        </Col>
    );
});