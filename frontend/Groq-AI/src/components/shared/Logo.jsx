import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import groq from "../../assets/Groq-1024x512.png";

const Logo = () => {
  return (
    <div style={{
      display: 'flex',
      marginRight: "auto",
      alignItems: 'center',
      gap: '8px'
    }}>

      <Link to={'/'}>
        <img
          src={groq}
          alt="groq"
          width={'100px'}
          height={'50px'}
          className='image-inverted'
        />
      </Link>{' '}
      {/* Uncomment below to include Typography */}
      {/* <Typography sx={{
        display: { md: "block", sm: "block", xs: "none" },
        mr: "auto",
        fontWeight: "800",
        textShadow: "2px 2px 20px #000"
      }}>
        <span style={{ fontSize: "20px" }}>Groq</span>-AI
      </Typography> */}

    </div>
  );
};

export default Logo;
