export type CalculateScrollPositionForVirtualTopProps = {
    offset: number;
    currentTarget: number;
    scrollDistance: number;
    offsetHeight: number;
    scrollHeight: number;
}

export const calculateScrollPositionForVirtualTop = function (props: CalculateScrollPositionForVirtualTopProps): number | null {
    const {
              offset,
              scrollHeight,
              offsetHeight,
              currentTarget,
              scrollDistance,
          } = props;

    const isScrollToTop = offset < 0;

    if (isScrollToTop) {
        return Math.max(0, currentTarget + scrollDistance);
    }

    const isScrollToBottom = offset > 0;

    if (isScrollToBottom) {
        return Math.min(scrollHeight - offsetHeight, currentTarget + scrollDistance);
    }

    return null;
};