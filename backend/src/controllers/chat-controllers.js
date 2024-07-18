const User = require("../models/User.js");
const { configureGroqAI } = require("../config/groq-config.js");

const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not found OR Token Malfunctioned" });
        
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        // send all chats of user with new one to groq api
        const config = configureGroqAI();

        // get latest response 
        const chatResponse = await config.chat.completions.create({
            messages: chats,
            model: "llama3-8b-8192",
        });

        user.chats.push(chatResponse.choices[0].message);
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const sendChatToUser = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not found OR Token Malfunctioned" });
        
        if (user._id.toString() !== res.locals.jwtData.id) return res.status(401).json({ message: "Permissions didn't match" });

        return res.status(200).json({ message: 'OK', chats: user.chats });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteChats = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not found OR Token Malfunctioned" });
        
        if (user._id.toString() !== res.locals.jwtData.id) return res.status(401).json({ message: "Permissions didn't match" });
        
        user.chats = []; // @ts-ignore
        await user.save();
        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    generateChatCompletion,
    sendChatToUser,
    deleteChats,
};
