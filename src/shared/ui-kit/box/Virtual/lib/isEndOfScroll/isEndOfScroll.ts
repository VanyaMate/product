export type IsEndOfScrollProps = {
    scrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
}

export const isEndOfScroll = function (props: IsEndOfScrollProps): boolean {
    return props.scrollHeight - props.offsetHeight - Math.abs(props.scrollTop) <= 1;
};