import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { IoIosLogIn } from "react-icons/io";
import groq from "../assets/groq-removebg-preview.png";
import CustomizedInput from '../components/shared/CustomizedInput';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      toast.error('Please fill in both email and password fields');
      return;
    }

    try {
      toast.loading('Signing In', { id: 'login' });
      await auth?.login(email, password);
      toast.success("Signed in Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate('/chat');
    }
  }, [auth, navigate]);

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box paddingLeft={8} mt={6} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={groq} alt="groq" style={{ width: "520px", height: "" }} />
      </Box>
      <Box 
        display={"flex"} 
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}   
        padding={2}
        ml={"auto"}
        mr={8}
        mt={8}
      >
        <form 
          onSubmit={handleSubmit}
          style={{
            margin: "auto", 
            padding: "30px",
            boxShadow: "10px 10px 20px black",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "white"
          }}
        >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography
              variant={"h4"}
              textAlign={"center"}
              padding={4}
              fontWeight={600}
            >
              <span style={{ fontSize: 44, color: 'black' }}>LOGIN</span>
            </Typography>
            <CustomizedInput type='email' name='email' label='Email' />
            <CustomizedInput type='password' name='password' label='Password' />
            <Button 
              type='submit' 
              sx={{
                px: 2, 
                py: 2, 
                mt: 2, 
                width: '400px', 
                borderRadius: 2, 
                bgcolor: '#000000',
                color: 'white',
                fontSize: 25,
                fontWeight: 600,
                ":hover": {
                  bgcolor: 'white',
                  color: 'black',
                  border: 'black 2px solid'
                }
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
