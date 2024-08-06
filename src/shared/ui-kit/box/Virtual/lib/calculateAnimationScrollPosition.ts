export type CalculateAnimationScrollPositionProps = {
    timestamp: number;
    startAnimationTime: number;
    startAnimationPosition: number;
    targetScrollPosition: number;
    animationMs: number;
}

export const calculateAnimationScrollPosition = function (props: CalculateAnimationScrollPositionProps): number {
    const {
              startAnimationPosition,
              startAnimationTime,
              animationMs,
              targetScrollPosition,
              timestamp,
          } = props;

    const progress      = timestamp - startAnimationTime;
    const easeInOutQuad = (t: number) => t < 0.5
                                         ? 2 * t * t
                                         : -1 + (4 - 2 * t) * t;

    const elapsedTime = Math.min(progress / animationMs, 1);
    const ease        = easeInOutQuad(elapsedTime);

    return startAnimationPosition + ease * (targetScrollPosition - startAnimationPosition);
};