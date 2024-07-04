import {
    useFriendsStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useFriendsStoreUpdaterByNotifications.ts';
import {
    useDialoguesStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useDialoguesStoreUpdaterByNotifications.ts';


export const useGlobalStoreUpdaterByNotifications = function () {
    useFriendsStoreUpdaterByNotifications();
    useDialoguesStoreUpdaterByNotifications();
};