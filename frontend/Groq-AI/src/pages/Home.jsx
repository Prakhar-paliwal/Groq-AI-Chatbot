import React from 'react';
import { Box } from '@mui/material';
import TypingAnim from '../components/shared/Typer/TypingAnim';
import groqCloud from '../assets/groqcloud.png';
import chatImage from '../assets/localhost_5173_chat.png';

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"} mx={"auto"} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        mt: 3
      }}>
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mx: "auto",
            mt: 10,
            position: "fixed"
          }}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 5, my: 10 }}>
            <img src={groqCloud} alt="groqCloud" style={{ width: "80%", margin: "auto", marginTop: 5, alignSelf: "center" }} />
          </Box>
          <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
            <img src={chatImage} alt="chatbot"
              style={{
                display: "flex", margin: "auto", width: "80%", borderRadius: 20,
                boxShadow: "-5px -5px 80px #F24738",
                marginTop: 10
              }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
