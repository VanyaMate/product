import {
    isTop,
} from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';
import { last } from '@/shared/ui-kit/box/Virtual/lib/last/last.ts';
import {
    first,
} from '@/shared/ui-kit/box/Virtual/lib/first/first.ts';
import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';


export type IsPreviousChangesProps = {
    type: VirtualType;
    previousFirst: unknown;
    previousLast: unknown;
    items: Array<unknown>;
}

export const isPreviousChanges = function (props: IsPreviousChangesProps) {
    return (isTop(props.type) && props.previousLast !== last(props.items)) ||
        (!isTop(props.type) && props.previousFirst !== first(props.items));
};