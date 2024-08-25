import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    IoArchive,
    IoBuild, IoCall,
    IoChatbox,
    IoCloud,
    IoCloudDone,
    IoCloudOffline, IoColorPalette,
    IoDocument,
    IoDownload, IoImage, IoLanguage,
    IoMail,
    IoMailOpen,
    IoMailUnread,
    IoNewspaper,
    IoNotifications,
    IoPersonAdd,
    IoPersonRemove,
    IoSad, IoSettings, IoShield,
    IoSync, IoText,
    IoTrash,
} from 'react-icons/io5';
import css
    from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.module.scss';
import { IconType } from 'react-icons';


export type NotificationShortItemIconOptions = {
    component: IconType,
    className: string,
}

export const NotificationIconByType: Record<DomainNotificationType, NotificationShortItemIconOptions> = {
    [DomainNotificationType.ERROR]                          : {
        component: IoSad,
        className: css.negative,
    },
    [DomainNotificationType.UNKNOWN]                        : {
        component: IoNotifications,
        className: css.neutral,
    },
    [DomainNotificationType.CONNECTED]                      : {
        component: IoCloudDone,
        className: css.positive,
    },
    [DomainNotificationType.CONNECTING]                     : {
        component: IoCloud,
        className: css.neutral,
    },
    [DomainNotificationType.DISCONNECTED]                   : {
        component: IoCloudOffline,
        className: css.negative,
    },
    [DomainNotificationType.TOKENS_UPDATE]                  : {
        component: IoSync,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE_IN]                : {
        component: IoMailUnread,
        className: css.notification,
    },
    [DomainNotificationType.USER_MESSAGE_OUT]               : {
        component: IoMailUnread,
        className: css.positive,
    },
    [DomainNotificationType.USER_MESSAGE_DELETED_IN]        : {
        component: IoTrash,
        className: css.notification,
    },
    [DomainNotificationType.USER_MESSAGE_DELETED_OUT]       : {
        component: IoTrash,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE_REDACTED_IN]       : {
        component: IoMail,
        className: css.notification,
    },
    [DomainNotificationType.USER_MESSAGE_REDACTED_OUT]      : {
        component: IoMail,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE_READ_IN]           : {
        component: IoMailOpen,
        className: css.notification,
    },
    [DomainNotificationType.USER_MESSAGE_READ_OUT]          : {
        component: IoMailOpen,
        className: css.neutral,
    },
    [DomainNotificationType.FRIEND_REQUEST_IN]              : {
        component: IoPersonAdd,
        className: css.notification,
    },
    [DomainNotificationType.FRIEND_REQUEST_OUT]             : {
        component: IoPersonAdd,
        className: css.positive,
    },
    [DomainNotificationType.FRIEND_DELETED_IN]              : {
        component: IoPersonRemove,
        className: css.notification,
    },
    [DomainNotificationType.FRIEND_DELETED_OUT]             : {
        component: IoPersonRemove,
        className: css.negative,
    },
    [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN]     : {
        component: IoPersonAdd,
        className: css.notification,
    },
    [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT]    : {
        component: IoPersonAdd,
        className: css.positive,
    },
    [DomainNotificationType.FRIEND_REQUEST_CANCELED_IN]     : {
        component: IoPersonRemove,
        className: css.notification,
    },
    [DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT]    : {
        component: IoPersonRemove,
        className: css.negative,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_IN]             : {
        component: IoMailUnread,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_OUT]            : {
        component: IoMailUnread,
        className: css.positive,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN]     : {
        component: IoTrash,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT]    : {
        component: IoTrash,
        className: css.negative,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN]    : {
        component: IoMail,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT]   : {
        component: IoMail,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_READ_IN]        : {
        component: IoMailOpen,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_READ_OUT]       : {
        component: IoMailOpen,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN]    : {
        component: IoMailOpen,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT]   : {
        component: IoMailOpen,
        className: css.neutral,
    },
    [DomainNotificationType.DIALOGUE_CREATED_IN]            : {
        component: IoChatbox,
        className: css.notification,
    },
    [DomainNotificationType.DIALOGUE_CREATED_OUT]           : {
        component: IoChatbox,
        className: css.positive,
    },
    [DomainNotificationType.DIALOGUE_UPDATED_IN]            : {
        component: IoBuild,
        className: css.notification,
    },
    [DomainNotificationType.DIALOGUE_UPDATED_OUT]           : {
        component: IoBuild,
        className: css.neutral,
    },
    [DomainNotificationType.DIALOGUE_DELETED_IN]            : {
        component: IoTrash,
        className: css.notification,
    },
    [DomainNotificationType.DIALOGUE_DELETED_OUT]           : {
        component: IoTrash,
        className: css.negative,
    },
    [DomainNotificationType.DIALOGUE_ARCHIVED_IN]           : {
        component: IoArchive,
        className: css.notification,
    },
    [DomainNotificationType.DIALOGUE_ARCHIVED_OUT]          : {
        component: IoArchive,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN]    : {
        component: IoChatbox,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT]   : {
        component: IoChatbox,
        className: css.positive,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_IN]    : {
        component: IoBuild,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_OUT]   : {
        component: IoBuild,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN]    : {
        component: IoTrash,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT]   : {
        component: IoTrash,
        className: css.negative,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN]  : {
        component: IoChatbox,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT] : {
        component: IoChatbox,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN]   : {
        component: IoArchive,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT]  : {
        component: IoArchive,
        className: css.neutral,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN] : {
        component: IoArchive,
        className: css.notification,
    },
    [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT]: {
        component: IoArchive,
        className: css.neutral,
    },
    [DomainNotificationType.POST_CREATED_IN]                : {
        component: IoNewspaper,
        className: css.notification,
    },
    [DomainNotificationType.POST_CREATED_OUT]               : {
        component: IoNewspaper,
        className: css.positive,
    },
    [DomainNotificationType.POST_DELETED_IN]                : {
        component: IoNewspaper,
        className: css.notification,
    },
    [DomainNotificationType.POST_DELETED_OUT]               : {
        component: IoNewspaper,
        className: css.neutral,
    },
    [DomainNotificationType.POST_UPDATED_IN]                : {
        component: IoNewspaper,
        className: css.notification,
    },
    [DomainNotificationType.POST_UPDATED_OUT]               : {
        component: IoNewspaper,
        className: css.neutral,
    },
    [DomainNotificationType.FILE_UPLOADED_IN]               : {
        component: IoDownload,
        className: css.notification,
    },
    [DomainNotificationType.FILE_UPLOADED_OUT]              : {
        component: IoDownload,
        className: css.neutral,
    },
    [DomainNotificationType.FILE_UPDATED_IN]                : {
        component: IoDocument,
        className: css.notification,
    },
    [DomainNotificationType.FILE_UPDATED_OUT]               : {
        component: IoDocument,
        className: css.neutral,
    },
    [DomainNotificationType.FILE_DELETED_IN]                : {
        component: IoDocument,
        className: css.notification,
    },
    [DomainNotificationType.FILE_DELETED_OUT]               : {
        component: IoDocument,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_CREATED_IN]            : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_CREATED_OUT]           : {
        component: IoLanguage,
        className: css.positive,
    },
    [DomainNotificationType.LANGUAGE_UPDATED_IN]            : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_UPDATED_OUT]           : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_DELETED_IN]            : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_DELETED_OUT]           : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_WORD_CREATED_IN]       : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_WORD_CREATED_OUT]      : {
        component: IoLanguage,
        className: css.positive,
    },
    [DomainNotificationType.LANGUAGE_WORD_UPDATED_IN]       : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_WORD_UPDATED_OUT]      : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_WORD_DELETED_IN]       : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_WORD_DELETED_OUT]      : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_CREATED_IN]     : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_CREATED_OUT]    : {
        component: IoLanguage,
        className: css.positive,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_IN]     : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_OUT]    : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_DELETED_IN]     : {
        component: IoLanguage,
        className: css.notification,
    },
    [DomainNotificationType.LANGUAGE_FOLDER_DELETED_OUT]    : {
        component: IoLanguage,
        className: css.neutral,
    },
    [DomainNotificationType.USER_AVATAR_UPDATE_IN]          : {
        component: IoImage,
        className: css.notification,
    },
    [DomainNotificationType.USER_AVATAR_UPDATE_OUT]         : {
        component: IoImage,
        className: css.neutral,
    },
    [DomainNotificationType.USER_LOGIN_UPDATE_IN]           : {
        component: IoText,
        className: css.notification,
    },
    [DomainNotificationType.USER_LOGIN_UPDATE_OUT]          : {
        component: IoText,
        className: css.neutral,
    },
    [DomainNotificationType.PASSWORD_UPDATE]                : {
        component: IoShield,
        className: css.notification,
    },
    [DomainNotificationType.NOTIFICATIONS_UPDATE]           : {
        component: IoNotifications,
        className: css.notification,
    },
    [DomainNotificationType.NOTIFICATIONS_STATE_UPDATE]     : {
        component: IoNotifications,
        className: css.notification,
    },
    [DomainNotificationType.USER_CONTACTS_UPDATE_IN]        : {
        component: IoSettings,
        className: css.notification,
    },
    [DomainNotificationType.USER_CONTACTS_UPDATE_OUT]       : {
        component: IoSettings,
        className: css.neutral,
    },
    [DomainNotificationType.USER_BACKGROUND_UPDATE_IN]      : {
        component: IoColorPalette,
        className: css.notification,
    },
    [DomainNotificationType.USER_BACKGROUND_UPDATE_OUT]     : {
        component: IoColorPalette,
        className: css.neutral,
    },
    [DomainNotificationType.USER_PERMISSIONS_UPDATE_IN]     : {
        component: IoSettings,
        className: css.notification,
    },
    [DomainNotificationType.USER_PERMISSIONS_UPDATE_OUT]    : {
        component: IoSettings,
        className: css.neutral,
    },
    [DomainNotificationType.CALL_OFFER_IN]                  : {
        component: IoCall,
        className: css.notification,
    },
    [DomainNotificationType.CALL_OFFER_OUT]                 : {
        component: IoCall,
        className: css.positive,
    },
    [DomainNotificationType.CALL_ANSWER_IN]                 : {
        component: IoCall,
        className: css.notification,
    },
    [DomainNotificationType.CALL_ANSWER_OUT]                : {
        component: IoCall,
        className: css.positive,
    },
    [DomainNotificationType.CALL_START_IN]                  : {
        component: IoCall,
        className: css.notification,
    },
    [DomainNotificationType.CALL_START_OUT]                 : {
        component: IoCall,
        className: css.positive,
    },
    [DomainNotificationType.CALL_FINISH_IN]                 : {
        component: IoCall,
        className: css.notification,
    },
    [DomainNotificationType.CALL_FINISH_OUT]                : {
        component: IoCall,
        className: css.neutral,
    },
};