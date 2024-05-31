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
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


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
                {
                    friends.requestsIn.map((request) => (
                        <UserPreviewItem
                            key={ request.requestId }
                            user={ request.user }
                        >
                            <Button>+</Button>
                        </UserPreviewItem>
                    ))
                }
            </DetailsBody>
        </Details>
    );
});