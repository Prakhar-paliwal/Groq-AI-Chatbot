import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import red from '@mui/material/colors/red';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from '../context/helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// const chatMessages = [
//   { role: "assistant", content: "Hello! How can I assist you today?" },
//   { role: "user", content: "Can you tell me a joke?" },
//   { role: "assistant", content: "Sure! Why don't scientists trust atoms? Because they make up everything!" },
//   { role: "user", content: "What's the weather like today?" },
//   { role: "assistant", content: "I can't provide real-time weather updates, but you can check a weather website or app for the latest information." },
//   { role: "user", content: "Give me some productivity tips." },
//   { role: "assistant", content: "Certainly! Here are some productivity tips:\n1. Prioritize your tasks.\n2. Take regular breaks.\n3. Eliminate distractions.\n4. Set specific goals.\n5. Use productivity tools like to-do lists or apps." },
//   { role: "user", content: "What's the capital of France?" },
//   { role: "assistant", content: "The capital of France is Paris." },
//   { role: "user", content: "Can you help me with my homework?" },
//   { role: "assistant", content: "I'd be happy to help! What subject or topic are you working on?" }
// ];

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletedChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadChats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Sucessfully loaded Chats", { id: "loadChats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadChats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <div>
      <Box sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3
      }}>
        <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
          <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17,29,39)", flexDirection: "column", borderRadius: 5, mx: 3 }}>
            <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
              {auth?.user?.name[0]}
              {auth?.user?.name.split(" ")[1]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans", fontSize: "18px" }}>You are talking to a ChatBot</Typography>
            <Typography sx={{ mx: "auto", my: 4, p: 3, fontFamily: "work sans", textAlign: "justify", fontSize: "18px" }}>Ask questions, seek information, or just chat for fun. Our AI is here to assist you with accurate and helpful responses.</Typography>
            <Button
              onClick={handleDeleteChats}
              sx={{ width: "200px", my: "auto", color: "white", fontWeight: "700", borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": { bgcolor: red.A400 } }}
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 2, overflowX: "hidden" }}>
          <Typography sx={{ mx: "auto", fontSize: "35px", color: "white", mb: 2, fontWeight: "600" }}>Model: Llama3-8b-8192</Typography>
          <Box sx={{
            width: "100%", height: "60vh", mx: "auto", borderRadius: 3, display: "flex", flexDirection: "column", scrollBehavior: "smooth", overflow: "scroll", overflowX: "hidden", overflowY: "auto"
          }}>
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
          <div style={{ width: "100%", backgroundColor: "rgb(17,27,39)", borderRadius: 8, display: "flex", margin: "auto" }}>
            <input
              ref={inputRef}
              type="text"
              style={{ width: "100%", backgroundColor: "transparent", padding: "15px", border: "none", outline: "none", color: "white", fontSize: "20px" }}
            />
            <IconButton onClick={handleSubmit} onKeyDown={handleSubmit} sx={{ ml: "auto", color: "white", mr: 1 }}>
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Chat;
