import { FC, memo } from 'react';
import { LinkProps } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { IoSettings } from 'react-icons/io5';
import {
    SiteNavigationLink,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationLink/SiteNavigationLink.tsx';
import { LinkStyleType } from '@/shared/ui-kit/links/Link/types/types.ts';


export type UserSettingsLinkProps =
    {}
    & Omit<LinkProps, 'to'>;

export const UserSettingsLink: FC<UserSettingsLinkProps> = memo(function UserSettingsLink (props) {
    const { ...other } = props;

    return (
        <SiteNavigationLink
            { ...other }
            icon={ <IoSettings/> }
            styleType={ LinkStyleType.PRIMARY }
            to="/settings"
        />
    );
});