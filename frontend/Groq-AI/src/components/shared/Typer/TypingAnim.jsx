import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Groq AI transforms your questions into insightful answers.',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        "Explore endless possibilities with Groq's intuitive chat interface.",
        2000,
        'Engage with Groq AI for instant, intelligent responses',
        2000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '30px', color: "white", display: 'inline-block', textShadow: "1px 1px 20px #000", textAlign: "center" }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
