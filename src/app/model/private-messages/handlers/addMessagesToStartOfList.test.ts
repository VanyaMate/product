import {
    DomainMessage,
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    addMessagesToStartOfList,
} from '@/app/model/private-messages/handlers/addMessagesToStartOfList.ts';


const getMessageObject = function (id: string, date: number): DomainMessage {
    return {
        id          : id,
        message     : '',
        dialogueId  : '',
        read        : false,
        type        : DomainMessageType.TEXT,
        author      : {
            id    : '1',
            avatar: '',
            login : '',
            online: false,
        },
        creationDate: date,
        redacted    : false,
    };
};

describe('addMessagesToStartOfList', () => {
    let store: DomainMessage[];

    beforeAll(() => {
        store = [ getMessageObject('1', Date.now()) ];
    });

    test('добавление старого сообщения в начало списка', () => {
        const state = addMessagesToStartOfList(
            store,
            [ getMessageObject('2', Date.now() - 1000) ],
        );

        expect(state.length).toBe(2);
        expect(state[0].id).toBe('2');
    });

    test('добавление старых сообщений в начало списка', () => {
        const state = addMessagesToStartOfList(
            store,
            [
                getMessageObject('3', Date.now() - 6000),
                getMessageObject('2', Date.now() - 5000),
                getMessageObject('4', Date.now() - 3000),
                getMessageObject('5', Date.now() - 1000),
            ],
        );

        expect(state.length).toBe(5);
        expect(state[0].id).toBe('3');
    });

    test('частичное добавление старых сообщений в начало списка', () => {
        const state = addMessagesToStartOfList(
            store,
            [
                getMessageObject('2', Date.now() - 8000),
                getMessageObject('4', Date.now() - 5000),
                getMessageObject('3', Date.now() - 3000),
                getMessageObject('5', Date.now() + 1000),
            ],
        );

        expect(state.length).toBe(4);
        expect(state[0].id).toBe('2');
    });

    test('попытка добавить новое сообщение, но не подходящее по дате', () => {
        const state = addMessagesToStartOfList(
            store,
            [ getMessageObject('2', Date.now() + 1000) ],
        );

        expect(state).toBeNull();
    });

    test('попытка добавить сообщение которое уже добавлено', () => {
        const state = addMessagesToStartOfList(
            store,
            [ getMessageObject('1', Date.now()) ],
        );

        expect(state).toBeNull();
    });
});