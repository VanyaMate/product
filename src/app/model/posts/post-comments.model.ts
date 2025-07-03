import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { effect, store, Store } from '@vanyamate/sec';
import {
    getPostsByUserIdEffect, replyOnPostCommentEffect,
    sendPostCommentEffect,
} from '@/app/model/posts/posts.model.ts';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    getCommentRepliesAction,
} from '@/app/action/post-comments/getCommentReplies/getCommentReplies.action.ts';
import {
    getCommentRepliesByCursorAction,
} from '@/app/action/post-comments/getCommentRepliesByCursor/getCommentRepliesByCursor.action.ts';
import { loginMarker, logoutMarker } from '@/app/model/auth/auth.model.ts';


export type PostCommentsHierarchyModel = Record<string, Store<Array<string>>>;
export type PostCommentsModel = Record<string, Store<DomainComment>>;
export type PostCommentsCursors = Record<string, string>;

export const getCommentRepliesEffect         = effect(getCommentRepliesAction);
export const getCommentRepliesByCursorEffect = effect(getCommentRepliesByCursorAction);

export const $postCommentsCursors = store<PostCommentsCursors>({})
    .disableOn(logoutMarker, {})
    .enableOn(loginMarker, {})
    .on(
        getCommentRepliesEffect,
        'onSuccess',
        (hierarchy, { result, args }) => {
            hierarchy[args[0]] = result.at(-1)?.id ?? '';
            return { ...hierarchy };
        },
    )
    .on(
        getCommentRepliesByCursorEffect,
        'onSuccess',
        (hierarchy, { result, args }) => {
            hierarchy[args[0]] = result.at(-1)?.id ?? '';
            return { ...hierarchy };
        },
    )
    .on(
        getPostsByUserIdEffect,
        'onSuccess',
        (_, { result }) => {
            // make hierarchy
            const hierarchy: PostCommentsCursors = {};

            result.list.forEach((post: DomainPost) => {
                post.comments.forEach((comment) => {
                    hierarchy[comment.id] = comment.comments.at(-1)?.id ?? '';
                });
            });

            return hierarchy;
        },
    );


export const $postCommentsHierarchy = store<PostCommentsHierarchyModel>({})
    .disableOn(logoutMarker, {})
    .enableOn(loginMarker, {})
    .on(
        getCommentRepliesEffect,
        'onSuccess',
        (hierarchy, { result, args }) => {
            // update hierarchy
            result.forEach((comment) => {
                hierarchy[comment.id] = store([]);
            });

            if (hierarchy[args[0]]) {
                hierarchy[args[0]].set(hierarchy[args[0]].get().concat(result.map(({ id }) => id)));
            } else {
                hierarchy[args[0]] = store(result.map(({ id }) => id));
            }

            return { ...hierarchy };
        },
    )
    .on(
        getCommentRepliesByCursorEffect,
        'onSuccess',
        (hierarchy, { result, args }) => {
            // update hierarchy
            result.forEach((comment) => {
                hierarchy[comment.id] = store([]);
            });

            if (hierarchy[args[0]]) {
                hierarchy[args[0]].set(hierarchy[args[0]].get().concat(result.map(({ id }) => id)));
            } else {
                hierarchy[args[0]] = store(result.map(({ id }) => id));
            }

            return { ...hierarchy };
        },
    )
    .on(
        getPostsByUserIdEffect,
        'onSuccess',
        (_, { result }) => {
            // make hierarchy
            const hierarchy: PostCommentsHierarchyModel = {};

            result.list.forEach((post: DomainPost) => {
                post.comments?.forEach((comment) => {
                    hierarchy[comment.id] = store(comment.comments.map(({ id }) => id));
                    comment.comments.forEach((reply) => {
                        hierarchy[reply.id] = store(reply.comments.map(({ id }) => id));
                    });
                });
            });

            return hierarchy;
        },
    )
    .on(
        sendPostCommentEffect,
        'onSuccess',
        (hierarchy, { result }) => {
            // update hierarchy
            hierarchy[result.id] = store([]);
            return { ...hierarchy };
        },
    )
    .on(
        replyOnPostCommentEffect,
        'onSuccess',
        (hierarchy, { result, args }) => {
            // update hierarchy
            if (hierarchy[args[1]]) {
                hierarchy[args[1]].set(hierarchy[args[1]].get().concat(result.id));
            } else {
                hierarchy[args[1]].set([ result.id ]);
            }
            hierarchy[result.id] = store([]);
            return { ...hierarchy };
        },
    );


export const $postComments = store<PostCommentsModel>({})
    .disableOn(logoutMarker, {})
    .enableOn(loginMarker, {})
    .on(
        getCommentRepliesEffect,
        'onSuccess',
        (state, { result }) => {
            result.forEach((comment) => {
                state[comment.id] = store(comment);
            });

            return { ...state };
        },
    )
    .on(
        getCommentRepliesByCursorEffect,
        'onSuccess',
        (state, { result }) => {
            result.forEach((comment) => {
                state[comment.id] = store(comment);
            });

            return { ...state };
        },
    )
    .on(
        getPostsByUserIdEffect,
        'onSuccess',
        (_, { result }) => {
            const comments: PostCommentsModel = {};

            result.list.forEach((post: DomainPost) => {
                post.comments?.forEach((comment) => {
                    comment.comments.forEach((reply) => {
                        comments[reply.id] = store(reply);
                    });
                    comments[comment.id] = store(comment);
                });
            });

            return comments;
        },
    )
    .on(
        sendPostCommentEffect,
        'onSuccess',
        (comments, { result }) => {
            comments[result.id] = store(result);
            return { ...comments };
        },
    )
    .on(
        replyOnPostCommentEffect,
        'onSuccess',
        (comments, { result, args }) => {
            const commented = comments[args[1]]?.get();

            if (commented) {
                commented.comments.push(result);
                commented.repliesAmount += 1;
                comments[args[1]].set({ ...commented });
            }
            comments[result.id] = store(result);

            return { ...comments };
        },
    );
