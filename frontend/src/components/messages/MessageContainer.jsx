import {useEffect} from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected.jsx";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:w-[500px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <>
                    <div className='px-4 py-2'>
                        <span className='label-text text-base'>To:</span>{" "}
                        <span className='text-base font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <div className='divider px-3 mt-1 mb-1'></div>
                    <Messages/>
                    <MessageInput/>
                </>
            )}
        </div>
    );
};
export default MessageContainer;
