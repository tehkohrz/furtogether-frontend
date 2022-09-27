import React from 'react';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
// import { Box, Button } from "@mui/material";
import { Navbar, linksArray } from './components/elements/Navbar';
import Signup from './components/pages/user/Signup';
import Map from './components/pages/walk/Map';
import Profile from './components/pages/user/Profile';
import Signin from './components/pages/user/Signin';
import EditProfile from './components/pages/user/EditProfile';
import Friends from './components/pages/friends/Friends';

import { useAuth } from './hooks/use-auth';

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

const Routes6 = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar links={linksArray} />}></Route>
      <Route
        path='/signup'
        element={
          <>
            <Navbar links={linksArray} />
            <Signup />
          </>
        }
      />
      <Route
        path='/signin'
        element={
          <>
            <Navbar links={linksArray} />
            <Signin />
          </>
        }
      />
      <Route
        path='/profile'
        element={
          <>
            <Navbar links={linksArray} />
            <RequireAuth>{<Profile />}</RequireAuth>
          </>
        }
      />
      <Route
        path='/editProfile'
        element={
          <>
            <Navbar links={linksArray} />
            <RequireAuth>{<EditProfile />}</RequireAuth>
          </>
        }
      />
      <Route
        path='/friends'
        element={
          <>
            <Navbar links={linksArray} />
            <RequireAuth>{<Friends />}</RequireAuth>
          </>
        }
      />
      <Route
        path='/hotspots'
        element={
          <>
            <Navbar links={linksArray} />
            <Map />
          </>
        }
      />
    </Routes>
  );
};

export default Routes6;
