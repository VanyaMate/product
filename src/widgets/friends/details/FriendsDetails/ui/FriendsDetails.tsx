import { FC, memo } from 'react';
import { Details } from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import {
    DetailsTitle,
} from '@/shared/ui-kit/details/Details/ui/DetailsTitle/DetailsTitle.tsx';
import {
    DetailsBody,
} from '@/shared/ui-kit/details/Details/ui/DetailsBody/DetailsBody.tsx';
import {
    UserPreviewItem,
} from '@/entities/user/item/UserPreviewItem/ui/UserPreviewItem.tsx';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import {
    RemoveFriendButton,
} from '@/features/friend/button/RemoveFriendButton/ui/RemoveFriendButton.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $friendsList } from '@/app/model/friends/friends.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export const FriendsDetails: FC = memo(function FriendsDetails () {
    const friends = useStore($friendsList);
    const { t }   = useTranslation();

    if (!friends) {
        return <Loader/>;
    }

    return (
        <Details open>
            <DetailsTitle>{ t.page.friends.friends_list_title } ({ friends.length })</DetailsTitle>
            <DetailsBody>
                <Col>
                    {
                        friends.map((friend) => (
                            <UserPreviewItem
                                key={ friend.id }
                                showOnline
                                user={ friend }
                            >
                                <RemoveFriendButton userId={ friend.id }/>
                            </UserPreviewItem>
                        ))
                    }
                </Col>
            </DetailsBody>
        </Details>
    );
});