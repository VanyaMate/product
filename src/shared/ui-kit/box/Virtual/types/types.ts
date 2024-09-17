import { MutableRefObject, ReactNode } from 'react';


export type VirtualHandler = () => void;

export type UseVirtualAction = {
    onNextHandler: VirtualHandler;
    onPreviousHandler: VirtualHandler;
    onOtherHandler: VirtualHandler;
    action: MutableRefObject<VirtualAction>;
}

export enum VirtualAction {
    AUTOSCROLL_NEXT     = 'autoscroll_next',
    AUTOSCROLL_PREVIOUS = 'autoscroll_previous',
    TOGGLE_NEXT         = 'toggle_next',
    TOGGLE_PREVIOUS     = 'toggle_previous',
    NONE                = 'none'
}

export enum VirtualScrollDirection {
    TOP    = 'top',
    BOTTOM = 'bottom',
    NONE   = 'none'
}


export type VirtualIndexSetter = (index: number, list: VirtualList, showAmount: number) => void;

export enum VirtualType {
    TOP,
    BOTTOM
}

export type VirtualList = Array<unknown>;
export type VirtualUploadMethod = () => Promise<unknown>;
export type VirtualRenderMethod = (item: unknown, index: number, offset: number) => ReactNode;
export type VirtualScrollTo = (target: number, smooth: boolean, animationMs: number) => void;

export type VirtualElementProps = {
    currentIndex: MutableRefObject<number>;
    toFirstItem: () => void;
}
export type VirtualElement = (props: VirtualElementProps) => ReactNode;
