import { ComponentPropsWithoutRef, FC, memo } from 'react';


export type SearchPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const SearchPage: FC<SearchPageProps> = memo(function SearchPage (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ className }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            { }
            SearchPageComponent
        </div>
    );
});