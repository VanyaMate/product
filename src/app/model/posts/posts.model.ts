import {
    getPostsByUserIdAction,
} from '@/app/action/posts/getPostsByUserId/getPostsByUserId.action.ts';
import { effect, store } from '@vanyamate/sec';
import { DomainPost, isDomainPost } from 'product-types/dist/post/DomainPost';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';
import {
    createPostAction,
} from '@/app/action/posts/createPost/createPost.action.ts';


export const getPostsByUserIdEffect = effect(getPostsByUserIdAction);
export const createPostEffect       = effect(createPostAction);


export const $currentPostUserId = store<string>('')
    .on(getPostsByUserIdEffect, 'onBefore', (_, { args: [ userId ] }) => userId)
    .on(logoutEffect, 'onBefore', () => '');


export const $postsPending = store(false)
    .on(getPostsByUserIdEffect, 'onBefore', () => true)
    .on(getPostsByUserIdEffect, 'onFinally', () => false);

export const $postsList = store<Array<DomainPost>>([])
    .on(getPostsByUserIdEffect, 'onBefore', () => [])
    .on(getPostsByUserIdEffect, 'onSuccess', (_, { result }) => result.list.filter(isDomainPost))
    .on(createPostEffect, 'onSuccess', (state, { result }) => {
        if ($currentPostUserId.get() === result.author.id) {
            return [ ...state, result ];
        } else {
            return state;
        }
    })
    .on(logoutEffect, 'onBefore', () => []);