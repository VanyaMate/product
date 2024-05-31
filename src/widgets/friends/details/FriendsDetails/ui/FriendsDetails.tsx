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
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useTranslation } from 'react-i18next';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    friendsReducer,
} from '@/app/redux/slices/friends/slice/friends.slice.ts';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';


export const FriendsDetails: FC = memo(function FriendsDetails () {
    const friends = useAppSelector((state) => state.friends);
    const { t }   = useTranslation([ 'friends-page' ]);

    useReducerConnector('friends', friendsReducer);

    if (!friends) {
        return <Loader/>;
    }

    return (
        <Details open={ true }>
            <DetailsTitle>{ t('friends_list_title') } ({ friends.friends.length })</DetailsTitle>
            <DetailsBody>
                {
                    friends.friends.map((friend) => (
                        <UserPreviewItem
                            key={ friend.id }
                            user={ friend }
                        >
                            <Button>-</Button>
                        </UserPreviewItem>
                    ))
                }
            </DetailsBody>
        </Details>
    );
});