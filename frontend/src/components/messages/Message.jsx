import {useAuthContext} from "../../context/AuthContext";
import {extractTime} from "../../utils/extractTime";
import useConversation from "../../store/useConversation";
import React from "react";

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profilePic}/>
                </div>
            </div>

            <div>
                {message.imageUrl ? (
                    <div className='relative'>
                        <img src={message.imageUrl} alt='Sent image' className='max-w-80 rounded-lg'/>
                    </div>
                ) : (
                    <div
                        className={`chat-bubble max-w-none text-white ${bubbleBgColor} ${shakeClass} pb-2 whitespace-pre-wrap break-words`}>
                        {message.message}
                    </div>
                )}
            </div>
            <div className='chat-footer text-gray-600 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
