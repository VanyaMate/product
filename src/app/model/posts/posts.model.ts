import {
    getPostsByUserIdAction,
} from '@/app/action/posts/getPostsByUserId/getPostsByUserId.action.ts';
import { effect, store, pending, to } from '@vanyamate/sec';
import { DomainPost, isDomainPost } from 'product-types/dist/post/DomainPost';
import {
    loginMarker,
    logoutMarker,
} from '@/app/model/auth/auth.model.ts';
import {
    createPostAction,
} from '@/app/action/posts/createPost/createPost.action.ts';
import {
    removePostAction,
} from '@/app/action/posts/removePost/removePost.action.ts';
import {
    sendPostCommentAction,
} from '@/app/action/post-comment/sendPostComment/sendPostComment.action.ts';
import {
    replyOnPostCommentAction,
} from '@/app/action/post-comment/replyOnPostComment/replyOnPostComment.action.ts';
import {
    unlikePostAction,
} from '@/app/action/posts/unlikePost/unlikePost.action.ts';
import { likePostAction } from '@/app/action/posts/likePost/likePost.action.ts';


export const getPostsByUserIdEffect   = effect(getPostsByUserIdAction);
export const createPostEffect         = effect(createPostAction);
export const removePostEffect         = effect(removePostAction);
export const sendPostCommentEffect    = effect(sendPostCommentAction);
export const replyOnPostCommentEffect = effect(replyOnPostCommentAction);
export const likePostEffect           = effect(likePostAction);
export const unlikePostEffect         = effect(unlikePostAction);


export const $currentPostUserId = store<string>('')
    .disableOn(logoutMarker, '')
    .enableOn(loginMarker, '')
    .on(getPostsByUserIdEffect, 'onBefore', (_, { args: [ userId ] }) => userId);


export const $postsPending = pending([ getPostsByUserIdEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);


export const $postsList = store<Array<DomainPost>>([])
    .disableOn(logoutMarker, [])
    .enableOn(loginMarker, [])
    .on(getPostsByUserIdEffect, 'onBefore', to([]))
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
        const post = state.find((post) => post.id === postId);
        if (post) {
            post.commentsAmount += 1;
            post.comments.push(result);
            return [ ...state ];
        }
    })
    .on(replyOnPostCommentEffect, 'onSuccess', (state, {
        result, args: [ postId, commentsIds ],
    }) => {
        const post = state.find((post) => post.id === postId);
        if (post) {
            let commentsList = post.comments;
            $begin: for (let i = 0, id: string = ''; i < commentsIds.length; i++) {
                id = commentsIds[i];
                for (let j = 0; j < commentsList.length; j++) {
                    if (commentsList[j].id === id) {
                        commentsList = commentsList[j].comments;
                        continue $begin;
                    }
                }
                return state;
            }
            commentsList.push(result);
            return [ ...state ];
        }
    })
    .on(likePostEffect, 'onSuccess', (state, { result }) => {
        const post = state.find((post) => post.id === result.post.id);
        if (post && post.liked === false) {
            post.liked = true;
            post.likesAmount += 1;
            return [ ...state ];
        }
    })
    .on(unlikePostEffect, 'onSuccess', (state, { result }) => {
        const post = state.find((post) => post.id === result.post.id);
        if (post && post.liked === true) {
            post.liked       = false;
            post.likesAmount = Math.max(0, post.likesAmount - 1);
            return [ ...state ];
        }
    });