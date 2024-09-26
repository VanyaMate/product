export type Translation = {
    app: TranslationMainApp;
    buttons: TranslationButtons;
    validation: TranslationValidation
    contacts: TranslationContactsPage,
    search: TranslationSearch,
    page: {
        userSettings: TranslationUserSettingsPage,
        files: TranslationFilesPage,
        friends: TranslationFriendsPage,
        languages: TranslationLanguagesPage,
        dialogues: TranslationDialoguesPage,
        posts: TranslationPostsPage
    },
    notifications: {
        message: TranslationNotificationsMessage,
        title: TranslationNotificationTitle,
        helpers: TranslationNotificationsHelpers
    },
}

export type TranslationSearch = {
    search_placeholder: string,
    search_users: string,
    search_no_results: string
}

export type TranslationButtons = {
    order_new_to_old: string,
    order_old_to_new: string,
    accept: string,
    cancel: string
}

export type TranslationMainApp = {
    logo: string,
    aria_logo: string,
    home_page: string,
    about_us_page: string,
    excel_splitter_page: string,
    dialogue_page: string,
    user_page: string,
    search_page: string,
    friends_page: string,
    dialogues_page: string,
    files_page: string,
    languages_page: string,
    music_page: string,
    posts_page: string,
    photos_page: string,
    settings_page: string,
    open_navigation_menu: string,
    close_navigation_menu: string,
    open_user_menu: string,
    close_user_menu: string,
    open_user_notifications: string,
    close_user_notifications: string,
    toggle_language_button: string,
    toggle_language_aria_button: string,
    toggle_theme_button: string,
    toggle_theme_aria_button: string,
    toggle_theme_image_alt_button: string,
    not_found_title: string,
    not_found_description: string,
    error_boundary_title: string,
    close_modal_window_button: string,
    user_auth_form_enter_button: string,
    user_registration_form_enter_button: string,
    user_form_sign_in: string,
    user_form_sign_up: string,
    user_auth_form_login_label: string,
    user_auth_form_password_label: string,
    user_auth_form_email_label: string,
    user_auth_form_remember_label: string,
    auth_error_title: string,
    auth_success_title: string,
    logout_button: string,
    go_to_user_page_of: string,
    request_error: string,
    work_in_progress: string
}

export type TranslationUserSettingsPage = {
    profile_settings: string,
    menu_profile_link: string,
    menu_privacy_link: string,
    menu_notifications_link: string,
    menu_customisation_link: string,
    discard_changes: string,
    apply_changes: string,
    link_to_avatar: string,
    insert_link_to_avatar: string,
    login_label: string,
    login_placeholder: string,
    avatar_change_form_title: string,
    login_change_form_title: string,
    password_label: string,
    second_password_label: string,
    password_placeholder: string,
    password_title: string,
    background_title: string,
    background_label: string,
    background_placeholder: string,
    no_background: string
}

export type TranslationPostsPage = {
    posts_title: string,
    empty_posts_list: string,
    write_new_post: string,
    delete_post: string,
    no_more_posts: string
}

export type TranslationLanguagesPage = {
    language_page_title: string,
    add_language: string,
    add_folder: string,
    add_word: string,
    update_language: string,
    update_folder: string,
    update_word: string,
    remove_language: string,
    remove_folder: string,
    remove_word: string,
    add_item: string,
    check_word: string,
    uncheck_word: string,
    language_title: string,
    folder_title: string,
    word_original: string,
    word_translations: string,
    word_notice: string,
    no_folder_selected: string,
    select_folder: string,
    languages_not_exist: string,
    folders_not_exist: string,
    words_not_exits: string,
    words_checked: string
}

export type TranslationFriendsPage = {
    requests_in_list_title: string,
    requests_out_list_title: string,
    friends_list_title: string,
    add_to_friends: string,
    remove_from_friends: string,
    accept_friend_request: string,
    cancel_friend_request: string
}

export type TranslationFilesPage = {
    files_label_id: string,
    files_label_upload_date: string,
    files_label_original_name: string,
    files_label_weight: string,
    files_label_owner: string,
    files_label_type: string,
    select_files: string,
    upload_files: string,
    files_preload_title: string,
    selected_files: string,
    selected_files_title: string,
}

export type TranslationDialoguesPage = {
    dialogue_not_selected: string,
    send_message: string,
    search_message: string,
    empty_dialogue: string,
    no_more_messages_in_dialogue: string,
    no_more_dialogues: string,
    dialogue_me: string,
    dialogue_archived_by_user: string,
    dialogue_deleted_by_user: string,
    dialogue_archived_by_me: string,
    dialogue_deleted_by_me: string,
    write_message: string,
    search_messages_not_found: string,
    mark_all_messages_as_read: string,
    archive_dialogue: string,
    unarchive_dialogue: string,
    remove_dialogue: string,
    show_interlocutor: string,
    hide_interlocutor: string,
    open_dialogue: string,
    create_dialogue: string,
    remove_message: string
}

export type TranslationContactsPage = {
    github: string,
    vk: string
}

export type TranslationValidation = {
    min_length_error: string,
    max_length_error: string,
    is_not_valid_email: string,
    no_equal_password: string
}

export type TranslationNotificationsHelpers = {
    no_more_notifications: string
}

export type TranslationNotificationsMessage = {
    u_msg_out: string
}

export type TranslationNotificationTitle = {
    con: string,
    cong: string,
    dis: string,
    err: string,
    fr_r_in: string,
    fr_r_out: string,
    fr_d_in: string,
    fr_d_out: string,
    fr_ra_in: string,
    fr_ra_out: string,
    fr_rc_in: string,
    fr_rc_out: string,
    u_msg_in: string,
    u_msg_out: string,
    u_msg_d_in: string,
    u_msg_d_out: string,
    u_msg_r_in: string,
    u_msg_r_out: string,
    u_msg_read_in: string,
    u_msg_read_out: string,
    p_msg_in: string,
    p_msg_out: string,
    p_msg_d_in: string,
    p_msg_d_out: string,
    p_msg_r_in: string,
    p_msg_r_out: string,
    p_msg_read_in: string,
    p_msg_read_out: string,
    tkn: string,
    unk: string
}