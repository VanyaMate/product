import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage,
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import { DomainFriends } from 'product-types/dist/friends/DomainFriends';
import { DomainCall } from 'product-types/dist/call/DomainCall';


export type CreateMockUserData = {
    id: string,
    login: string,
    avatar?: string
};

export const getUserMockData = function (id: string, login: string, avatar: string = ''): DomainUser {
    return {
        id,
        login,
        avatar,
        online: true,
    };
};

export const getUserFullMockData = function (id: string, login: string, avatar: string = ''): DomainUserFull {
    return {
        ...getUserMockData(id, login, avatar),
        background : null,
        nameInfo   : {
            firstName: '',
            lastName : '',
        },
        contacts   : {
            email      : '',
            phoneNumber: '',
        },
        permissions: {
            friendRequest  : DomainUserPermissionsFriendRequest.ALL,
            generalPage    : DomainUserPermissionsGeneralPage.ALL,
            privateDialogue: DomainUserPermissionsPrivateDialogue.ALL,
            dialogue       : DomainUserPermissionsDialogue.ALL,
        },
    };
};

export const getFriendsMockData = function (...friends: Array<CreateMockUserData>): DomainFriends {
    return {
        friends    : friends.map((friend) => getUserMockData(friend.id, friend.login, friend.avatar)),
        requestsOut: friends.map((friend) => ({
            user     : getUserMockData(friend.id, friend.login, friend.avatar),
            requestId: Math.random().toString(16),
            message  : 'Message',
        })),
        requestsIn : friends.map((friend) => ({
            user     : getUserMockData(friend.id, friend.login, friend.avatar),
            requestId: Math.random().toString(16),
            message  : 'Message',
        })),
    };
};

export const getCallsMockData = function (...users: Array<CreateMockUserData>): Array<DomainCall> {
    return users.map((user) => ({
        id          : Math.random().toString(16),
        user        : getUserMockData(user.id, user.login, user.avatar),
        finished    : false,
        initiatorId : '',
        creationDate: Date.now(),
        finishedDate: 0,
        connectionId: Math.random().toString(16),
    }));
};