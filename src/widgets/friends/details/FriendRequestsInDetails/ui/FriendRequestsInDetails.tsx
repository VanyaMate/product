import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useTranslation } from 'react-i18next';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    friendsReducer,
} from '@/app/redux/slices/friends/slice/friends.slice.ts';
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


export type FriendRequestsInDetailsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendRequestsInDetails: FC<FriendRequestsInDetailsProps> = memo(function FriendRequestsInDetails () {
    const friends = useAppSelector((state) => state.friends);
    const { t }   = useTranslation([ 'friends-page' ]);

    useReducerConnector('friends', friendsReducer);

    if (!friends) {
        return <Loader/>;
    }

    return (
        <Details>
            <DetailsTitle>
                { t('requests_in_list_title') } ({ friends.requestsIn.length })
            </DetailsTitle>
            <DetailsBody>
                <Col>
                    {
                        friends.requestsIn.map((request) => (
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