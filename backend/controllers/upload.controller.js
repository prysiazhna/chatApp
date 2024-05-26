import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";


export const uploadImage = async (req, res) => {
    const {conversationId} = req.params;
    const {senderId, receiverId} = req.body;

    if (!conversationId) {
        return res.status(400).json({error: "Conversation ID is required"});
    }

    if (!senderId || !receiverId) {
        return res.status(400).json({error: "Sender ID and Receiver ID are required"});
    }

    const newMessage = new Message({
        conversationId,
        senderId,
        receiverId,
        imageUrl: `/uploads/${req.file.filename}`,
    });

    try {
        const savedMessage = await newMessage.save();

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [savedMessage._id],
            });
        } else {
            conversation.messages.push(savedMessage._id);
            await conversation.save();
        }

        res.json(savedMessage);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
