import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { store, Store } from '@vanyamate/sec';
import {
    getPostsByUserIdEffect, replyOnPostCommentEffect,
    sendPostCommentEffect,
} from '@/app/model/posts/posts.model.ts';
import { DomainPost } from 'product-types/dist/post/DomainPost';


export type PostCommentsHierarchyModel = Record<string, Store<Array<string>>>;
export type PostCommentsModel = Record<string, Store<DomainComment>>;

export const $postCommentsHierarchy = store<PostCommentsHierarchyModel>({})
    .on(
        getPostsByUserIdEffect,
        'onSuccess',
        (_, { result }) => {
            // make hierarchy
            const hierarchy: PostCommentsHierarchyModel = {};

            result.list.forEach((post: DomainPost) => {
                post.comments.forEach((comment) => {
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
            hierarchy[args[1]].set(hierarchy[args[1]].get().concat(result.id));
            hierarchy[result.id] = store([]);
            return { ...hierarchy };
        },
    );


export const $postComments = store<PostCommentsModel>({})
    .on(
        getPostsByUserIdEffect,
        'onSuccess',
        (_, { result }) => {
            const comments: PostCommentsModel = {};

            result.list.forEach((post: DomainPost) => {
                post.comments.forEach((comment) => {
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
                comments[args[1]].set({ ...commented });
            }
            comments[result.id] = store(result);

            return { ...comments };
        },
    );