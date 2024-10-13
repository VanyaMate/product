import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './Tooltip.module.scss';
import { createPortal } from 'react-dom';
import {
    getModalPosition,
    ModalPosition, ModalPositionSide,
} from '@/shared/lib/modal-position/getModalPosition.ts';


export type TooltipProps =
    {
        elementRef: MutableRefObject<HTMLElement>;
        show: boolean;
        tooltipPosition?: ModalPositionSide;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Tooltip: FC<TooltipProps> = memo(function Tooltip (props) {
    const {
              className,
              elementRef,
              show,
              children,
              tooltipPosition = 'top',
              ...other
          }                                                           = props;
    const [ currentTooltipRenderState, setCurrentTooltipRenderState ] = useState<boolean>(false);
    const [ currentTooltipShowState, setCurrentTooltipShowState ]     = useState<boolean>(false);
    const tooltipRef                                                  = useRef<HTMLDivElement>(null);
    const [ currentTooltipPosition, setCurrentTooltipPosition ]       = useState<ModalPosition>({
        top : 0,
        left: 0,
    });
    const [ positionOffset, setPositionOffset ]                       = useState<ModalPosition>({
        top : 0,
        left: 0,
    });

    // Animation
    useEffect(() => {
        if (show && !currentTooltipRenderState && elementRef.current) {
            setCurrentTooltipRenderState(true);
        } else if (show && currentTooltipRenderState && elementRef.current && tooltipRef.current) {
            requestAnimationFrame(() => {
                setCurrentTooltipPosition(getModalPosition(elementRef, tooltipRef, tooltipPosition));
                setCurrentTooltipShowState(true);
            });
        } else if (!show && currentTooltipRenderState) {
            const ref = tooltipRef.current;
            setCurrentTooltipShowState(false);
            const onTransitionEnd = () => {
                setCurrentTooltipRenderState(false);
                ref.removeEventListener('transitionend', onTransitionEnd);
            };
            ref.addEventListener('transitionend', onTransitionEnd);
        }
    }, [ currentTooltipRenderState, elementRef, show, tooltipPosition ]);

    // Update offset position
    useEffect(() => {
        if (show && currentTooltipRenderState && elementRef.current && tooltipRef.current) {
            requestAnimationFrame(() => {
                setPositionOffset(() => {
                    const positionDelta = getModalPosition(elementRef, tooltipRef, tooltipPosition);
                    return {
                        top : currentTooltipPosition.top - positionDelta.top,
                        left: currentTooltipPosition.left - positionDelta.left,
                    };
                });
            });
        }
    }, [ currentTooltipRenderState, elementRef, show, children, currentTooltipPosition.top, currentTooltipPosition.left, tooltipPosition ]);

    useEffect(() => {
        if (show && currentTooltipRenderState && elementRef.current && tooltipRef.current) {
            const observer = new IntersectionObserver(() => {
                console.log('resized');
                setPositionOffset(() => {
                    const positionDelta = getModalPosition(elementRef, tooltipRef, tooltipPosition);
                    return {
                        top : currentTooltipPosition.top - positionDelta.top,
                        left: currentTooltipPosition.left - positionDelta.left,
                    };
                });
            });

            observer.observe(elementRef.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [ currentTooltipPosition.left, currentTooltipPosition.top, currentTooltipRenderState, elementRef, show, tooltipPosition ]);

    if (currentTooltipRenderState) {
        return createPortal(
            <div
                { ...other }
                className={ classNames(css.container, { [css.hidden]: !currentTooltipShowState }, [ className ]) }
                ref={ tooltipRef }
                style={ {
                    left     : currentTooltipPosition.left,
                    top      : currentTooltipPosition.top,
                    transform: `scale(${ currentTooltipShowState ? '1'
                                                                 : '0.8' }) translate(${ -positionOffset.left }px, ${ -positionOffset.top }px)`,
                } }
            >
                { children }
            </div>,
            document.body,
        );
    }

    return null;
});