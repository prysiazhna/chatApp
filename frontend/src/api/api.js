const BASE_API_URL = "https://prysiazhna-chat-app-server.vercel.app";

const API_URLS = {
    LOGIN: `${BASE_API_URL}/api/auth/login`,
    LOGOUT: `${BASE_API_URL}/api/auth/logout`,
    SIGN_UP: `${BASE_API_URL}/api/auth/signup`,
    GET_MESSAGES: `${BASE_API_URL}/api/messages/`,
    SEND_MESSAGE: `${BASE_API_URL}/api/messages/send/`,
    UPLOAD_IMAGE: `${BASE_API_URL}/api/upload/`,
    GET_CONVERSATIONS: `${BASE_API_URL}/api/users`
};
