import usePostRequest from "./usePostRequest.js";
import {useAuthContext} from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import API_URLS from "../api/api.js";

const useSignup = () => {
    const {loading, makePostRequest} = usePostRequest();
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const isValid = isFormValid({fullName, username, password, confirmPassword, gender});
        if (!isValid) return;

        const data = await makePostRequest(API_URLS.SIGN_UP, {fullName, username, password, confirmPassword, gender});

        if (data) {
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        }
    };

    return {loading, signup};
};

export default useSignup;


function isFormValid({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

