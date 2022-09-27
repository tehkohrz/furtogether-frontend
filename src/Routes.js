import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
// import { Box, Button } from "@mui/material";
import { Navbar } from './components/organisms/Navbar';
import Signup from './components/pages/user/Signup';
import Map from './components/pages/walk/Map';
import Profile from './components/pages/user/Profile';
import Signin from './components/pages/user/Signin';
import EditProfile from './components/pages/user/EditProfile';
import Friends from './components/pages/friends/Friends';

import { useAuth } from './hooks/use-auth';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

const routes = [
  {
    path: '/',
    element: <Navbar />,
  },
  {
    path: '/signup',
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: '/signin',
    element: (
      <>
        <Navbar />
        <Signin />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <Navbar />
        <RequireAuth>{<Profile />}</RequireAuth>
      </>
    ),
  },
  {
    path: '/editProfile',
    element: (
      <>
        <Navbar />
        <RequireAuth>{<EditProfile />}</RequireAuth>
      </>
    ),
  },
  {
    path: '/friends',
    element: (
      <>
        <Navbar />
        <RequireAuth>{<Friends />}</RequireAuth>
      </>
    ),
  },
  {
    path: '/hotspots',
    element: (
      <>
        <Navbar />
        <Map />
      </>
    ),
  },
];

export default routes;
