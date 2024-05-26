import useConversation from "../store/useConversation";
import API_URLS from "../api/api.js";
import {useAuthContext} from "../context/AuthContext";
import usePostRequest from "./usePostRequest";

const useSendMessage = () => {
    const {messages, setMessages, selectedConversation} = useConversation();
    const {authUser} = useAuthContext();
    const {loading, makePostRequest} = usePostRequest();

    const sendMessage = async (message) => {
        const data = await makePostRequest(`${API_URLS.SEND_MESSAGE}${selectedConversation._id}`, {
            message,
            senderId: authUser._id,
            receiverId: selectedConversation._id,
        });

        if (data) {
            setMessages([...messages, data]);
        }
    };

    const sendImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("senderId", authUser._id);
        formData.append("receiverId", selectedConversation._id);

        const data = await makePostRequest(`${API_URLS.UPLOAD_IMAGE}${selectedConversation._id}`, formData, true);

        if (data) {
            setMessages([...messages, data]);
        }
    };

    return {sendMessage, sendImage, loading};
};

export default useSendMessage;

