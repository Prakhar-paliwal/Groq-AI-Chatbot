const Groq = require('groq-sdk');

const configureGroqAI = () => {
    const config = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
    return config;
}

module.exports = { configureGroqAI };
