const { Router } = require("express");
const { verifyToken } = require("../utils/token-manager.js");
const { chatCompletionValidator, validate } = require("../utils/validators.js");
const { deleteChats, generateChatCompletion, sendChatToUser } = require("../controllers/chat-controllers.js");

// protected API
const chatRoutes = Router();

chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get('/all-chats', verifyToken, sendChatToUser);
chatRoutes.delete('/delete', verifyToken, deleteChats);

module.exports = chatRoutes;
