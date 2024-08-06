export type CalculateScrollPositionForVirtualBottomProps = {
    offset: number;
    currentTarget: number;
    scrollDistance: number;
    offsetHeight: number;
    scrollHeight: number;
}

export const calculateScrollPositionForVirtualBottom = function (props: CalculateScrollPositionForVirtualBottomProps): number | null {
    const {
              offset,
              scrollHeight,
              offsetHeight,
              currentTarget,
              scrollDistance,
          } = props;

    const isScrollToTop = offset < 0;

    if (isScrollToTop) {
        return Math.max(-(scrollHeight - offsetHeight), currentTarget - scrollDistance);
    }

    const isScrollToBottom = offset > 0;

    if (isScrollToBottom) {
        return Math.min(0, currentTarget + scrollDistance);
    }

    return null;
};