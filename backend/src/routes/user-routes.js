const { Router } = require("express");
const { getAllUsers, userLogin, userLogout, userSignUp, verifyLogin } = require("../controllers/user-controllers.js");
const { validate, signupValidator, loginValidator } = require("../utils/validators.js");
const { verifyToken } = require("../utils/token-manager.js");

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignUp);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyLogin);
userRoutes.get('/logout', verifyToken, userLogout);

module.exports = userRoutes;
