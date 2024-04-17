import { FC, memo } from 'react';


export type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = memo(function ProfilePage (props) {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            ProfilePageComponent
        </div>
    );
});