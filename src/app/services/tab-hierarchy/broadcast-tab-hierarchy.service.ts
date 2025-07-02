import {
    ITabHierarchy,
    TabHierarchyDisconnectCallback,
    TabHierarchyMessageCallback,
    TabHierarchyOnParentCallback,
} from '@/app/services/tab-hierarchy/i-tab-hierarchy.interface.ts';

// check-parent -> is-parent
// parent-remove -> applicant-check

type CheckParentMessage = {
    type: 'check-parent';
}

type IsParentMessage = {
    type: 'is-parent';
}

type ParentRemoveMessage = {
    type: 'parent-remove';
}

type ApplicantCheckMessage = {
    type: 'applicant-check';
    timestamp: number;
}

export type HierarchyMessage =
    CheckParentMessage
    | IsParentMessage
    | ParentRemoveMessage
    | ApplicantCheckMessage

export class BroadcastTabHierarchyService implements ITabHierarchy {
    private readonly _hierarchyBroadcast                            = new BroadcastChannel('tab-hierarchy');
    private readonly _broadcast                                     = new BroadcastChannel('tab-hierarchy-messages');
    private readonly _initTimestamp                                 = Date.now();
    private _isApplicant                                            = false;
    private _isParent                                               = false;
    private _toUnParent                                             = false;
    private _applicantTimer: ReturnType<typeof setTimeout>;
    private _onParentHandler: TabHierarchyOnParentCallback | null   = null;
    private _onUnParentHandler: TabHierarchyOnParentCallback | null = null;
    private _isConnected: boolean                                   = false;

    connect () {
        return this._hierarchyMessagesHandler();
    }

    message (message: any): void {
        this._broadcast.postMessage(message);
    }

    onMessage (callback: TabHierarchyMessageCallback): TabHierarchyDisconnectCallback {
        const listener = (evt: MessageEvent) => callback(evt.data);
        this._broadcast.addEventListener('message', listener);
        return () => this._broadcast.removeEventListener('message', listener);
    }

    onParent (callback: TabHierarchyOnParentCallback): void {
        this._onParentHandler = callback;
    }

    onUnParent (callback: TabHierarchyOnParentCallback): void {
        this._onUnParentHandler = callback;
    }

    private _getCheckParentMessage (): CheckParentMessage {
        return {
            type: 'check-parent',
        };
    }

    private _getIsParentMessage (): IsParentMessage {
        return {
            type: 'is-parent',
        };
    }

    private _getParentRemoveMessage (): ParentRemoveMessage {
        return {
            type: 'parent-remove',
        };
    }

    private _getApplicantCheckMessage (): ApplicantCheckMessage {
        return {
            type     : 'applicant-check',
            timestamp: this._initTimestamp,
        };
    }

    private _hierarchyMessagesHandler () {
        if (this._isConnected) {
            return () => {
            };
        }

        this._isConnected = true;

        const handler = (event: MessageEvent) => {
            const message = event.data;

            if (message && message.type) {
                switch (message.type) {
                    case 'check-parent':
                        this._checkParentMessageHandler();
                        return;
                    case 'is-parent':
                        this._onIsParentMessageHandler();
                        return;
                    case 'parent-remove':
                        this._parentRemoveMessageHandler();
                        return;
                    case 'applicant-check':
                        this._applicantCheckMessageHandler(message.timestamp);
                        return;
                    default:
                        return;
                }
            }
        };

        const visibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                this._disconnectHandler();
            }
        };

        const disconnect = () => {
            this._disconnectHandler();
            document.removeEventListener('visibilitychange', visibilityChange);
            this._hierarchyBroadcast.removeEventListener('message', handler);
            this._isConnected = false;
        };

        document.addEventListener('visibilitychange', visibilityChange);
        this._hierarchyBroadcast.addEventListener('message', handler);
        this._connectHandler();
        return disconnect;
    }

    private _connectHandler () {
        this._hierarchyBroadcast.postMessage(this._getCheckParentMessage());
        this._applicantHandler();
    }

    private _disconnectHandler () {
        if (this._isParent) {
            this._hierarchyBroadcast.postMessage(this._getParentRemoveMessage());
            this._toUnParent = true;
        }
    }

    private _clearApplicant () {
        this._isApplicant = false;
        clearTimeout(this._applicantTimer);
    }

    private _applicantHandler () {
        if (!this._isApplicant) {
            this._isApplicant    = true;
            this._applicantTimer = setTimeout(() => {
                this._isParent    = true;
                this._isApplicant = false;
                this._hierarchyBroadcast.postMessage(this._getIsParentMessage());
                setTimeout(() => {
                    this._onParentHandler?.();
                }, 50);
            }, 1000);
        }
    }

    /** Message Handlers **/

    private _checkParentMessageHandler () {
        if (this._isParent) {
            this._toUnParent = false;
            this._hierarchyBroadcast.postMessage(this._getIsParentMessage());
        }
    }

    private _parentRemoveMessageHandler () {
        this._applicantHandler();
        this._hierarchyBroadcast.postMessage(this._getApplicantCheckMessage());
    }

    private _onIsParentMessageHandler () {
        if (this._isParent) {
            this._isParent = false;
            this._onUnParentHandler?.();
        }
        this._clearApplicant();
    }

    private _applicantCheckMessageHandler (otherTimestamp: number) {
        if (this._initTimestamp > otherTimestamp) {
            this._clearApplicant();
        }

        if (this._toUnParent) {
            this._isParent = false;
            this._clearApplicant();
            this._onUnParentHandler?.();
        }
    }
}