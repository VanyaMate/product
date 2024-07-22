import { useLayoutEffect, useRef } from 'react';


export const useHandlerOfSidePositions = function (
    triggerTop: () => void,
    triggerBottom: () => void,
    hasMoreTop: boolean,
    hasMoreBottom: boolean,
) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            const firstElement                           = ref.current.firstElementChild;
            const lastElement                            = ref.current.lastElementChild;
            const observers: Array<IntersectionObserver> = [];

            if (firstElement && hasMoreTop && triggerTop) {
                console.log('Top init', firstElement);
                const observer = new IntersectionObserver(([ { isIntersecting } ]) => {
                    if (isIntersecting) {
                        console.log('Trigger top');
                        triggerTop();
                    }
                });
                observers.push(observer);
                observer.observe(firstElement);
            }

            if (lastElement && hasMoreBottom && triggerBottom) {
                console.log('Bottom init');
                const observer = new IntersectionObserver(([ { isIntersecting } ]) => {
                    if (isIntersecting) {
                        console.log('Trigger bottom');
                        triggerBottom();
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