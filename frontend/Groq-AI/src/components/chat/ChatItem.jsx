import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import groq from "../../assets/groq-logo.png";
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const extractChatBlock = (message) => {
  if (message.includes('```')) {
    const block = message.split('```');
    return block;
  }
};

const isCodeBlock = (str) => {
  if (str.includes('=') || str.includes('[') || str.includes(']') || str.includes('{') || str.includes('}') || str.includes('//') || str.includes(';') || str.includes('#')) {
    return true;
  }
  return false;
};

const detectLanguage = (code) => {
  const result = hljs.highlightAuto(code);
  return result.language || 'plaintext';
};

const ChatItem = ({ content, role }) => {
  const messageBlocks = extractChatBlock(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0", backgroundColor: "black" }}>
        <img src={groq} alt="groq" width={"100%"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language={detectLanguage(block)} customStyle={{ wordBreak: "break-word" }}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", backgroundColor: "white", color: 'black', fontWeight: "500" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language={detectLanguage(block)} customStyle={{ wordBreak: "break-word" }}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
