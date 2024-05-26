import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import API_URLS from "../api/api.js";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch(API_URLS.GET_CONVERSATIONS);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (!hasFetched.current) {
            getConversations();
            hasFetched.current = true;
        }
    }, []);

    return {loading, conversations};
};
export default useGetConversations;