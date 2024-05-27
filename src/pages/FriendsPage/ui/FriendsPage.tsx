import { ComponentPropsWithoutRef, FC, memo } from 'react';


export type FriendsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendsPage: FC<FriendsPageProps> = memo(function FriendsPage (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ className }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
                { }
                FriendsPageComponent
        </div>
    );
});