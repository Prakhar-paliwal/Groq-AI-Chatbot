const { Router } = require('express');
const userRoutes = require('./user-routes');
const chatRoutes = require('./chat-routes');

const appRouter = Router();

appRouter.use('/user', userRoutes); // domain/api/v1/user
appRouter.use('/chat', chatRoutes); // domain/api/v1/chat

module.exports = appRouter;
