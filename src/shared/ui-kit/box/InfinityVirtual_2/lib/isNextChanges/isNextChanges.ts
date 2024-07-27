import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';
import {
    first,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/first/first.ts';
import { last } from '@/shared/ui-kit/box/InfinityVirtual_2/lib/last/last.ts';
import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';


export type IsNextChangesProps = {
    type: VirtualType;
    previousFirst: unknown;
    previousLast: unknown;
    items: Array<unknown>;
}

export const isNextChanges = function (props: IsNextChangesProps) {
    return (isTop(props.type) && props.previousFirst !== first(props.items)) ||
        (!isTop(props.type) && props.previousLast !== last(props.items));
};