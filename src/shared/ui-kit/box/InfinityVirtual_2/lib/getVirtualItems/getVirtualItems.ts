export type GetVirtualItemsProps = {
    items: Array<unknown>;
    showAmount: number;
    index: number;
}

export const getVirtualItems = function (props: GetVirtualItemsProps) {
    return props.items.slice(props.index, props.index + props.showAmount);
};