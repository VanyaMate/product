import { expect, Route } from 'playwright/test';
import {
    CreateMockUserData,
    getCallsMockData, getFriendsMockData,
    getUserFullMockData,
} from './mockdata.fabric';


export const loginMockRoute = function (mockUserData: {
    login: string,
    password: string,
    remember: boolean
}) {
    return async function (route: Route) {
        const request = route.request();
        const method  = await request.method();

        if (method === 'POST') {
            const body = await request.postDataJSON();

            expect(body).toEqual({
                login   : mockUserData.login,
                password: mockUserData.password,
                remember: mockUserData.remember,
            });

            if (body.login) {
                await route.fulfill({
                    status     : 200,
                    contentType: 'application/json',
                    body       : JSON.stringify({
                        data: {
                            tokens: [ 'token-1', 'token-2' ],
                            user  : getUserFullMockData('1', body.login),
                        },
                    }),
                });
            }
        }
    };
};

export const getUserFullMockRoute = function (login: string, avatar: string = '') {
    return async function (route: Route) {
        await route.fulfill({
            status     : 200,
            contentType: 'application/json',
            body       : JSON.stringify({
                data: getUserFullMockData('1', login, avatar),
            }),
        });
    };
};

export const getFriendsMockRoute = function (...friends: Array<CreateMockUserData>) {
    return async function (route: Route) {
        await route.fulfill({
            status     : 200,
            contentType: 'application/json',
            body       : JSON.stringify({
                data: getFriendsMockData(...friends),
            }),
        });
    };
};

export const getCallsMockRoute = function (...users: Array<CreateMockUserData>) {
    return async function (route: Route) {
        await route.fulfill({
            status     : 200,
            contentType: 'application/json',
            body       : JSON.stringify({
                data: getCallsMockData(...users),
            }),
        });
    };
};