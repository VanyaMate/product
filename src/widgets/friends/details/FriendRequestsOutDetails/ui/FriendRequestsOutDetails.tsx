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
import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import {
    CancelFriendRequestButton,
} from '@/features/friend/button/CancelFriendRequestButton/ui/CancelFriendRequestButton.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col';
import { useStore } from '@vanyamate/sec-react';
import {
    $friendRequestsSent,
} from '@/app/model/friends/friends.model.ts';


export const FriendRequestsOutDetails: FC = memo(function FriendRequestsOutDetails () {
    const friends = useStore($friendRequestsSent);
    const { t }   = useTranslation([ 'friends-page' ]);

    if (!friends) {
        return <Loader/>;
    }

    return (
        <Details>
            <DetailsTitle>
                { t('requests_out_list_title') } ({ friends.length })
            </DetailsTitle>
            <DetailsBody>
                <Col>
                    {
                        friends.map((request) => (
                            <UserPreviewItem
                                key={ request.requestId }
                                user={ request.user }
                            >
                                <CancelFriendRequestButton
                                    requestId={ request.requestId }
                                />
                            </UserPreviewItem>
                        ))
                    }
                </Col>
            </DetailsBody>
        </Details>
    );
});