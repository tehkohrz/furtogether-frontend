<<<<<<< HEAD
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
=======
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
// import { Box, Button } from "@mui/material";
import { Navbar } from "./components/organisms/Navbar";
import Signup from "./components/pages/user/Signup";
import Map from "./components/pages/walk/Map";
import Profile from "./components/pages/user/Profile";
import Signin from "./components/pages/user/Signin";
import EditProfile from "./components/pages/user/EditProfile";
import Friends from "./components/pages/friends/Friends";

import { useAuth } from "./hooks/use-auth";
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
<<<<<<< HEAD
    return <Navigate to='/signin' state={{ from: location }} replace />;
=======
    return <Navigate to="/signin" state={{ from: location }} replace />;
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
  }

  return children;
}

const routes = [
  {
<<<<<<< HEAD
    path: '/',
    element: <></>,
  },
  {
    path: '/signup',
    element: (
      <>
=======
    path: "/",
    element: <Navbar />,
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
        <Signup />
      </>
    ),
  },
  {
<<<<<<< HEAD
    path: '/signin',
    element: (
      <>
=======
    path: "/signin",
    element: (
      <>
        <Navbar />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
        <Signin />
      </>
    ),
  },
  {
<<<<<<< HEAD
    path: '/profile',
    element: <>{<Profile />}</>,
  },
  {
    path: '/editProfile',
    element: (
      <>
=======
    path: "/profile",
    element: (
      <>
        <Navbar />
        <RequireAuth>{<Profile />}</RequireAuth>
      </>
    ),
  },
  {
    path: "/editProfile",
    element: (
      <>
        <Navbar />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
        <RequireAuth>{<EditProfile />}</RequireAuth>
      </>
    ),
  },
  {
<<<<<<< HEAD
    path: '/friends',
    element: (
      <>
=======
    path: "/friends",
    element: (
      <>
        <Navbar />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
        <RequireAuth>{<Friends />}</RequireAuth>
      </>
    ),
  },
  {
<<<<<<< HEAD
    path: '/hotspots',
    element: (
      <>
=======
    path: "/walk/map",
    element: (
      <>
        <Navbar />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
        <Map />
      </>
    ),
  },
];

export default routes;
