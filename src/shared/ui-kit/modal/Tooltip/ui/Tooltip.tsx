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
    ModalPosition,
} from '@/shared/lib/modal-position/getModalPosition.ts';


export type TooltipProps =
    {
        elementRef: MutableRefObject<HTMLElement>;
        show: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Tooltip: FC<TooltipProps> = memo(function Tooltip (props) {
    const {
              className,
              elementRef,
              show,
              children,
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
                setCurrentTooltipPosition(getModalPosition(elementRef, tooltipRef));
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
    }, [ currentTooltipRenderState, elementRef, show ]);

    // Update offset position
    useEffect(() => {
        if (show && currentTooltipRenderState && elementRef.current && tooltipRef.current) {
            requestAnimationFrame(() => {
                setPositionOffset(() => {
                    const position = getModalPosition(elementRef, tooltipRef);
                    return {
                        top : currentTooltipPosition.top - position.top,
                        left: currentTooltipPosition.left - position.left,
                    };
                });
            });
        }
    }, [ currentTooltipRenderState, elementRef, show, children, currentTooltipPosition.top, currentTooltipPosition.left ]);

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