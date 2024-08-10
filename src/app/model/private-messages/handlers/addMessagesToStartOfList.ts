import {
    DomainMessage,
    isDomainMessage,
} from 'product-types/dist/message/DomainMessage';


export const addMessagesToStartOfList = (store: DomainMessage[], data: DomainMessage[]) => {
    const messages: DomainMessage[] = data.filter(isDomainMessage);

    if (messages.length > 1) {
        const lastNewMessage      = messages[messages.length - 1];
        const dialogueLastMessage = store[0];

        if (new Date(lastNewMessage.creationDate) < new Date(dialogueLastMessage.creationDate)) {
            return [ ...messages, ...store ];
        }

        for (let i = messages.length - 1; i >= 0; i--) {
            if (new Date(messages[i].creationDate) < new Date(dialogueLastMessage.creationDate)) {
                return [ ...messages.slice(0, i + 1), ...store ];
            }
        }

        return null;
    } else if (messages.length === 1) {
        const dialogueLastMessage = store[0];
        const newMessage          = messages[0];
        const lastMessageIsEqual  = dialogueLastMessage.id === newMessage.id;
        const lastMessageIsOlder  = new Date(dialogueLastMessage.creationDate) < new Date(newMessage.creationDate);

        if (lastMessageIsEqual || lastMessageIsOlder) {
            return null;
        }

        return [ newMessage, ...store ];
    }

    return null;
};
