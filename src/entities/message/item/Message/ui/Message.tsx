import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import { MyMessage } from '@/entities/message/item/MyMessage/ui/MyMessage.tsx';
import {
    CompanionMessage,
} from '@/entities/message/item/CompanionMessage/ui/CompanionMessage.tsx';


export type MessageProps =
    {
        message: DomainMessage;
        userId: string;
    }
    & ComponentPropsWithoutRef<'article'>;

export const Message: FC<MessageProps> = memo(function Message (props) {
    const { message, userId, ...other } = props;

    return message.author.id === userId
           ? <MyMessage message={ message } { ...other }/>
           : <CompanionMessage message={ message } { ...other }/>;
});