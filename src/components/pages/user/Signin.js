import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks/use-auth';

// eslint-disable-next-line no-unused-vars
const Signin = ({ ...props }) => {
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigate(from, { replace: false });
    } catch (err) {
      alert(err.params);
    }
  };

  if (isAuthenticated) {
    console.log('isAuthenticated: ', isAuthenticated);
    navigate(from, { replace: true });
  }

  return (
    <div>
      <form>
        <Box
          display='flex'
          flexDirection={'column'}
          maxWidth={400}
          alignItems='center'
          justifyContent={'center'}
          margin='auto'
          marginTop={16}
          padding={3}
        >
          <Typography variant='h3' padding={3} textAlign='center'>
            {'Login'}
          </Typography>

          <TextField
            onChange={handleEmailChange}
            name='email'
            value={email}
            margin='normal'
            type={'email'}
            variant='outlined'
            placeholder='Email'
          />
          <TextField
            onChange={handlePasswordchange}
            name='password'
            value={password}
            margin='normal'
            type={'password'}
            variant='outlined'
            placeholder='Password'
          />
          <Button
            onClick={handleSignIn}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant='contained'
            // color="warning"
            style={{
              backgroundColor: '#3dccc7 ',
            }}
          >
            {'Login'}
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signin;
