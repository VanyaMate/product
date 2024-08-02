export const isStartOfScroll = function (scrollTop: number): boolean {
    return Math.abs(scrollTop) <= 1;
};