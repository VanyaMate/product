import { useLayoutEffect, useRef } from 'react';


export const useHandlerOfSidePositions = function (
    triggerTop: () => Promise<void>,
    triggerBottom: () => Promise<void>,
    hasMoreTop: boolean,
    hasMoreBottom: boolean,
) {
    const ref            = useRef<HTMLDivElement>(null);
    const disableTrigger = useRef<boolean>(false);

    useLayoutEffect(() => {
        if (ref.current) {
            const firstElement                           = ref.current.firstElementChild;
            const lastElement                            = ref.current.lastElementChild;
            const observers: Array<IntersectionObserver> = [];

            if (firstElement && hasMoreTop && triggerTop) {
                const observer = new IntersectionObserver(([ { isIntersecting } ]) => {
                    if (isIntersecting && !disableTrigger.current) {
                        disableTrigger.current = true;
                        ref.current.parentElement.scrollTo({ top: ref.current.parentElement.scrollTop + 1 });
                        triggerTop().then(() => disableTrigger.current = false);
                    }
                });
                observers.push(observer);
                observer.observe(firstElement);
            }

            if (lastElement && hasMoreBottom && triggerBottom) {
                const observer = new IntersectionObserver(([ { isIntersecting } ]) => {
                    if (isIntersecting && !disableTrigger.current) {
                        disableTrigger.current = true;
                        ref.current.parentElement.scrollTo({ top: ref.current.parentElement.scrollTop - 1 });
                        triggerBottom().then(() => disableTrigger.current = false);
                    }
                });
                observers.push(observer);
                observer.observe(lastElement);
            }

            return () => observers.forEach((observer) => observer.disconnect());
        }
    }, [ hasMoreBottom, hasMoreTop, ref, triggerBottom, triggerTop ]);

    return ref;
};