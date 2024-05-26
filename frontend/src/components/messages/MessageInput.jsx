import {useState} from "react";
import {BsImage, BsSend} from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const {loading, sendMessage, sendImage} = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await sendImage(file);
        }
    };
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white pr-16'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    <input
                        type='file'
                        id='imageInput'
                        accept='image/*'
                        style={{display: 'none'}}
                        onChange={handleImageChange}
                    />
                    <label htmlFor='imageInput'
                           className='absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer'>
                        <BsImage/>
                    </label>
                    <button type='submit' className='pl-10'>
                        {loading ? <div className='loading loading-spinner w-4 mt-1'></div> : <BsSend/>}
                    </button>
                </div>

            </div>
        </form>
    );
};
export default MessageInput;