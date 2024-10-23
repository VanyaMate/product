import {
    getPostsByUserIdAction,
} from '@/app/action/posts/getPostsByUserId/getPostsByUserId.action.ts';
import { effect, store } from '@vanyamate/sec';
import { DomainPost, isDomainPost } from 'product-types/dist/post/DomainPost';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';
import {
    createPostAction,
} from '@/app/action/posts/createPost/createPost.action.ts';
import {
    removePostAction,
} from '@/app/action/posts/removePost/removePost.action.ts';
import {
    sendPostCommentAction,
} from '@/app/action/post-comment/sendPostComment/sendPostComment.action.ts';


export const getPostsByUserIdEffect = effect(getPostsByUserIdAction);
export const createPostEffect       = effect(createPostAction);
export const removePostEffect       = effect(removePostAction);
export const sendPostCommentEffect  = effect(sendPostCommentAction);


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
        if ($currentPostUserId.get() === result.post.author.id) {
            return [ result.post, ...state ];
        } else {
            return state;
        }
    })
    .on(removePostEffect, 'onSuccess', (state, { result }) => {
        if ($currentPostUserId.get() === result.post.author.id) {
            return state.filter((post) => post.id !== result.post.id);
        } else {
            return state;
        }
    })
    .on(sendPostCommentEffect, 'onSuccess', (state, {
        result, args: [ postId ],
    }) => {
        console.log('OnSuccess', result);
        const post = state.find((post) => post.id === postId);
        console.log('Find from', state);
        console.log('Finded', post);
        if (post) {
            post.comments.push(result);
            return [ ...state ];
        }
    })
    .on(logoutEffect, 'onBefore', () => []);