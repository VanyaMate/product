import { MutableRefObject } from 'react';


export type ModalPosition = {
    top: number;
    left: number;
}

export type ModalPositionSide =
    'bottom'
    | 'top';

const MODAL_OFFSET: number = 5;

export const getModalPosition = function (containerRef: MutableRefObject<HTMLElement>, modalRef: MutableRefObject<HTMLElement>, side: ModalPositionSide = 'top'): ModalPosition {
    const {
              top,
              left,
              right,
              width,
              height,
          }                  = containerRef.current.getBoundingClientRect();
    const modalHeight        = modalRef.current.offsetHeight;
    const modalWidth         = modalRef.current.offsetWidth;
    const documentBodyWidth  = document.body.offsetWidth;
    const documentBodyHeight = document.body.offsetHeight;

    // calculate popover position
    let topPosition: number  = 0;
    let leftPosition: number = 0;

    const leftCenterPosition  = left + width / 2;
    const rightCenterPosition = documentBodyWidth - right + width / 2;
    const halfModalWidth      = modalWidth / 2;

    if (side === 'top') {
        topPosition = top > (modalHeight + MODAL_OFFSET)
                      ? top - modalHeight - MODAL_OFFSET
                      : top + height + MODAL_OFFSET;
    } else {
        if (top + height + modalHeight + MODAL_OFFSET > documentBodyHeight) {
            topPosition = top - modalHeight - MODAL_OFFSET;
        } else {
            topPosition = top + height + MODAL_OFFSET;
        }
    }

    if (documentBodyWidth <= modalWidth) {
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