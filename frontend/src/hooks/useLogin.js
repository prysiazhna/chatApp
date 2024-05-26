import toast from "react-hot-toast";
import usePostRequest from "./usePostRequest.js";
import {useAuthContext} from "../context/AuthContext.jsx";
import API_URLS from "../api/api.js";

function isFormValid(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}

const useLogin = () => {
    const {loading, makePostRequest} = usePostRequest();
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        const isValid = isFormValid(username, password);
        if (!isValid) return;

        const data = await makePostRequest(API_URLS.LOGIN, {username, password});

        if (data) {
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        }
    };

    return {loading, login};
};

export default useLogin;
