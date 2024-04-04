import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    findBodyParentElement,
} from '@/components/shared/ui/modal/Modal/helpers/findBodyParentElement.ts';


export interface IModalInnerManager {
    placeRef: MutableRefObject<HTMLDivElement>,
    modalRef: MutableRefObject<HTMLDivElement>
}

export const useModalInnerManager = function (opened: boolean) {
    const placeRef      = useRef<HTMLDivElement | null>(null);
    const modalRef      = useRef<HTMLDivElement | null>(null);
    const bodyParent    = useRef<HTMLElement | null>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    const getBodyParent = function (): HTMLElement | null {
        if (bodyParent.current !== null) {
            return bodyParent.current;
        }

        if (placeRef.current !== null) {
            return bodyParent.current = findBodyParentElement(placeRef.current);
        }

        return null;
    };

    const onOpenHandler = useCallback(() => {
        // Block parent
        const bodyParentElement = getBodyParent();
        if (bodyParentElement) {
            bodyParentElement.setAttribute('inert', 'true');
        }

        // Block body scroll
        document.body.classList.add('block-scroll');

        // Save previous focus
        previousFocus.current = document.activeElement as HTMLElement;

        // Set focus on modal
        modalRef.current?.focus();
    }, []);

    const onCloseHandler = useCallback(() => {
        // Unblock parent
        const bodyParentElement = getBodyParent();
        if (bodyParentElement) {
            bodyParentElement.removeAttribute('inert');
        }

        // Unblock body scroll
        document.body.classList.remove('block-scroll');

        // Set focus on previousFocus
        previousFocus.current?.focus();
    }, []);

    useEffect(() => {
        if (opened) {
            onOpenHandler();
        } else {
            onCloseHandler();
        }
    }, [ onOpenHandler, opened, onCloseHandler ]);

    return useMemo(() => ({ modalRef, placeRef }), []);
};