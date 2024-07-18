"# Groq-AI-Chatbot" 
# Groq AI Chatbot

A chatbot application built with the MERN stack (MongoDB, Express.js, React, Node.js) that leverages Groq AI for intelligent responses.

## Features

- User authentication and authorization (Sign Up, Login, Logout)
- Secure token management with JWT
- Chat functionality with Groq AI integration
- User-specific chat history
- Responsive design with a clean user interface

## Technologies Used

- MongoDB (Atlas)
- Express.js
- React (with Vite)
- Node.js
- Groq AI
- JWT for authentication
- Bcrypt for password hashing
- Material-UI (MUI) for React components

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MongoDB Atlas account
- Groq AI API credentials

### Installation

1. Clone the repository:

```
git clone https://github.com/Prakhar-paliwal/Groq-AI-Chatbot.git
cd Groq-AI-Chatbot
```

2. Install server dependencies:
```
cd backend
npm install
```

3. Install client dependencies:
```
cd frontend/Groq-AI
npm install
```

# Configuration

Create a .env file in the server directory and add the following environment variables:
```
PORT = 
GROQ_API_KEY = 
MONGODB_URI = 
JWT_SECRET = 
COOKIE_SECRET = 
```

Update sripts in package.json:
```
"scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
```

# Running the Application

1. Start the server:
```
cd backend
npm run dev
```

2. Start the client:
```
cd frontend/Groq-AI
npm run dev

```
