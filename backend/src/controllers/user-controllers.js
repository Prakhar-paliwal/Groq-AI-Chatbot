const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { check } = require("express-validator");
const { createToken } = require("../utils/token-manager.js");
const { COOKIE_NAME } = require("../utils/constants.js");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(201).json({
            message: "OK", users
        });
    } catch (error) {
        return res.status(500).json({
            message: "ERROR", cause: error.message
        });
    }
};

const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already Exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        
        await user.save();

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost", 
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true
        });

        console.log("User created Successfully");
        return res.status(201).json({
            message: "OK",
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "ERROR", cause: error.message
        });
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send("User not registered");

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost", 
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost", 
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({
            message: "OK", 
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "ERROR", cause: error.message
        });
    }
};

const verifyLogin = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).send("User not registered");

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(401).send("Permissions didn't match");
        }
        
        return res.status(200).json({
            message: "OK", 
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "ERROR", cause: error.message
        });
    }
};

const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).send("User not registered");

        if (res.locals.jwtData.id !== user._id.toString()) {
            return res.status(401).send("Permissions didn't match");
        }
        
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost", 
            signed: true,
            path: "/"
        });

        return res.status(200).json({
            message: "OK", 
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "ERROR", cause: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    userSignUp,
    userLogin,
    verifyLogin,
    userLogout
};
