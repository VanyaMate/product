import { Meta } from '@storybook/react';
import {
    UserProfileLink
} from '@/entities/user/link/UserProfileLink/ui/UserProfileLink.tsx';


const meta = {
    title    : 'entities/user/link/UserProfileLink',
    component: UserProfileLink,
    tags     : [ 'autodocs' ],
} satisfies Meta<typeof UserProfileLink>;

export default meta;

export const Default = {
    args: {
        login: 'admin',
        to   : '#',
    },
};