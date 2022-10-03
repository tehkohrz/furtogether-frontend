<<<<<<< HEAD
import React from 'react';
=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
>>>>>>> f05ca07ebc12f6deb5a2f56700fb9505ccbae64e
import { useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import Signup from './components/pages/user/Signup';
import Map from './components/pages/walk/Map';
import Profile from './components/pages/user/Profile';
import Signin from './components/pages/user/Signin';
import EditProfile from './components/pages/user/EditProfile';
import Friends from './components/pages/friends/Friends';

import { useAuth } from './hooks/use-auth';

import GoogleLogin from './components/molecules/GoogleLogin';
// import firebaseAuth from './services/firebase.service';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

// Google Auth
// const [user, setUser] = useState(null);

// useEffect(() => {
//   firebaseAuth.auth().onAuthStateChanged((googleUser) => {
//     setUser(googleUser);
//     console.log('Google Auth User: ', user);
//   });
// }, []);

const routes = [
  {
    path: '/',
    element: <Navbar />,
  },
  {
    path: '/signup',
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: '/signin',
    element: (
      <>
<<<<<<< HEAD
=======
=======
    path: "/signin",
    element: (
      <>
        <Navbar />
        <GoogleLogin />
>>>>>>> fbb0f98766a033b9ba95d59ed52198b2f360a139
>>>>>>> f05ca07ebc12f6deb5a2f56700fb9505ccbae64e
        <Signin />
      </>
    ),
  },
  {
    path: '/profile',
    element: <>{<Profile />}</>,
  },
  {
    path: '/editProfile',
    element: (
      <>
        <RequireAuth>{<EditProfile />}</RequireAuth>
      </>
    ),
  },
  {
    path: '/friends',
    element: (
      <>
        <RequireAuth>{<Friends />}</RequireAuth>
      </>
    ),
  },
  {
    path: '/walk/map',
    element: (
      <>
        <Map />
      </>
    ),
  },
];

export default routes;
