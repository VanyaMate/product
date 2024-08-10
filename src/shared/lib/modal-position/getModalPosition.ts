import { MutableRefObject } from 'react';


export type ModalPosition = {
    top: number;
    left: number;
}

export type ModalPositionSide = 'bottom' | 'top';

export const getModalPosition = function (containerRef: MutableRefObject<HTMLDivElement>, modalRef: MutableRefObject<HTMLDivElement>, side: ModalPositionSide = 'top'): ModalPosition {
    const {
              top,
              left,
              right,
              width,
              height,
          }           = containerRef.current.getBoundingClientRect();
    const modalHeight = modalRef.current.offsetHeight;
    const modalWidth  = modalRef.current.offsetWidth;
    const bodyWidth   = document.body.offsetWidth;
    const bodyHeight  = document.body.offsetHeight;

    // calculate popover position
    let topPosition: number  = 0;
    let leftPosition: number = 0;

    const leftCenterPosition  = left + width / 2;
    const rightCenterPosition = bodyWidth - right + width / 2;
    const halfModalWidth      = modalWidth / 2;

    if (side === 'top') {
        topPosition = top > (modalHeight + 5)
                      ? top - modalHeight - 5
                      : top + height + 5;
    } else {
        if (top + height + modalHeight + 5 > bodyHeight) {
            topPosition = top - modalHeight - 5;
        } else {
            topPosition = top + height + 5;
        }
    }

    if (bodyWidth <= modalWidth) {
        leftPosition = leftCenterPosition - halfModalWidth;
    } else if (leftCenterPosition > halfModalWidth) {
        if (rightCenterPosition > halfModalWidth) {
            leftPosition = leftCenterPosition - halfModalWidth;
        } else {
            leftPosition = leftCenterPosition - halfModalWidth - (halfModalWidth - rightCenterPosition);
        }
    } else {
        leftPosition = leftCenterPosition - halfModalWidth + (halfModalWidth - leftCenterPosition);
    }

    return { top: topPosition, left: leftPosition };
};