import { VirtualList } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';


export type GetVirtualItemsProps = {
    index: number;
    list: VirtualList;
    showAmount: number;
}

export const getVirtualList = function (props: GetVirtualItemsProps): VirtualList {
    const { list, index, showAmount } = props;
    return list.slice(index, showAmount + index);
};