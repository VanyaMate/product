import { VirtualType } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export type GetInitialIndexProps = {
    type: VirtualType;
    listLength: number;
    showAmount: number;
}

export const getInitialIndex = function (props: GetInitialIndexProps): number {
    const { type, showAmount, listLength } = props;

    if (isTop(type)) {
        return 0;
    }

    return Math.max(0, listLength - showAmount);
};