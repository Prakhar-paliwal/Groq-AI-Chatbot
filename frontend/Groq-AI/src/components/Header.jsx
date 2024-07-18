import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';
import { Box } from '@mui/material';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 } }}>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg='#ffffff'
                to='/chat'
                text='Go To Chat'
                textColor='black'
              />
              <NavigationLink
                bg='#ffffff'
                textColor='black'
                to='/'
                text='Logout'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg='#ffffff'
                to='/login'
                text='Login'
                textColor='black'
              />
              <NavigationLink
                bg='#ffffff'
                textColor='black'
                to='/signup'
                text='Sign Up'
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
