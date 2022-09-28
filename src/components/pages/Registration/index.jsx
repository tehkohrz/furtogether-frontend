import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';


import { SignUp, Login } from '../../organisms'

const Registration = () => {
    const { isAuthenticated, isInitialized } = useAuth();
  const [toggleSignIn, setToggleSignIn] = useState(true)
  
  const handleToggle =() => {
    setToggleSignIn(!toggleSignIn)
  }


  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  console.log('FROM: ', from)


  if (!isInitialized) return <h1>Loading...</h1>

  if (isAuthenticated) {
    console.log('isAuthenticated: ', isAuthenticated);
    navigate(from, { replace: true });
  }


  return (
    <div>
      {
        toggleSignIn ? <Login handleToggle = {handleToggle}/> : <SignUp handleToggle = {handleToggle}/>
      }
    </div>
  )
}

export default Registration