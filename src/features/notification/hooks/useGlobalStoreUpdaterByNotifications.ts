import {
    useFriendsStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useFriendsStoreUpdaterByNotifications.ts';
import {
    useDialoguesStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useDialoguesStoreUpdaterByNotifications.ts';
import {
    useCallStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useCallStoreUpdaterByNotifications.ts';


export const useGlobalStoreUpdaterByNotifications = function () {
    useFriendsStoreUpdaterByNotifications();
    useDialoguesStoreUpdaterByNotifications();
    useCallStoreUpdaterByNotifications();
};