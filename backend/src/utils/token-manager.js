const jwt = require('jsonwebtoken');
require('dotenv').config();
const { COOKIE_NAME } = require('./constants');

// Always hide your JWT_SECRET key otherwise anyone can use it to access your server

const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
}

const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") return res.status(401).json({ message: "Token not received" });

    // Returning a promise
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
            } else {
                // console.log("Token Verification successful");
                res.locals.jwtData = success;
                resolve();
                return next();
            }
        });
    });
}

module.exports = { createToken, verifyToken };
