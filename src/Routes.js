import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, linksArray } from './components/organisms/Navbar';
import Signup from './components/pages/user/Signup';
import Map from './components/pages/walk/Map';
import Profile from './components/pages/user/Profile';
import Signin from './components/pages/user/Signin';
import EditProfile from './components/pages/user/EditProfile';
import Friends from './components/pages/friends/Friends';

const Routes6 = () => {
  return (
    <Routes>
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
            <Profile />
          </>
        }
      />
      <Route
        path='/editProfile'
        element={
          <>
            <Navbar links={linksArray} />
            <EditProfile />
          </>
        }
      />
      <Route
        path='/friends'
        element={
          <>
            <Navbar links={linksArray} />
            <Friends />
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
