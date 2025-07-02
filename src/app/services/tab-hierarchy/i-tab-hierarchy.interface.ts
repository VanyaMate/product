export type TabHierarchyDisconnectCallback = () => void;
export type TabHierarchyMessageCallback = (message: any) => void;
export type TabHierarchyOnParentCallback = () => void;

export interface ITabHierarchy {
    message (message: any): void;

    onMessage (callback: TabHierarchyMessageCallback): TabHierarchyDisconnectCallback;

    onParent (callback: TabHierarchyOnParentCallback): void;

    onUnParent (callback: TabHierarchyOnParentCallback): void;
}