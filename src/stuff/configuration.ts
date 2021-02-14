
interface Configuration {
    [key: string]: string;
    VUE_APP_AUTHORITY: string;
    VUE_APP_CLIENT_ID: string;
    VUE_APP_REDIRECT_URI: string;
    VUE_APP_RESPONSE_TYPE: string;
    VUE_APP_SCOPE: string;
    VUE_APP_POST_LOGOUT_REDIRECT_URL: string;
    VUE_APP_SILENT_REDIRECT_URI: string;
    VUE_APP_VK_GROUP_DIALOG_URL: string;
    VUE_APP_DEV_FUNC_ENABLED: string;
    VUE_APP_FILES_BASE_ADDRESS: string;
}

export default {} as Configuration;
