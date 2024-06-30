import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
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
import {
    AcceptFriendRequestButton,
} from '@/features/friend/button/AcceptFriendRequestButton/ui/AcceptFriendRequestButton.tsx';
import {
    CancelFriendRequestButton,
} from '@/features/friend/button/CancelFriendRequestButton/ui/CancelFriendRequestButton.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col';
import { useStore } from '@vanyamate/sec-react';
import {
    friendRequestsReceived,
} from '@/app/model/friends/friends.model.ts';


export type FriendRequestsInDetailsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendRequestsInDetails: FC<FriendRequestsInDetailsProps> = memo(function FriendRequestsInDetails () {
    const friends = useStore(friendRequestsReceived);
    const { t }   = useTranslation([ 'friends-page' ]);

    if (!friends) {
        return <Loader/>;
    }

    return (
        <Details>
            <DetailsTitle>
                { t('requests_in_list_title') } ({ friends.length })
            </DetailsTitle>
            <DetailsBody>
                <Col>
                    {
                        friends.map((request) => (
                            <UserPreviewItem
                                key={ request.requestId }
                                user={ request.user }
                            >
                                <Row>
                                    <AcceptFriendRequestButton
                                        requestId={ request.requestId }
                                    />
                                    <CancelFriendRequestButton
                                        requestId={ request.requestId }
                                    />
                                </Row>
                            </UserPreviewItem>
                        ))
                    }
                </Col>
            </DetailsBody>
        </Details>
    );
});