import {useState} from "react";
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext";

const usePostRequest = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const makePostRequest = async (url, data, isFormData = false) => {
        setLoading(true);
        try {
            const headers = !isFormData ? {"Content-Type": "application/json"} : {};
            const body = isFormData ? data : JSON.stringify(data);
            const res = await fetch(url, {
                method: "POST",
                headers,
                body,
            });
            const responseData = await res.json();
            if (res.ok) {
                return responseData;
            } else {
                throw new Error(responseData.error || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {loading, makePostRequest};
};

export default usePostRequest;
