import React from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
// import { Box, Button } from "@mui/material";
import { Navbar, linksArray } from "./components/elements/Navbar";
import Signup from "./components/pages/user/Signup";
import Map from "./components/pages/walk/Map";
import Profile from "./components/pages/user/Profile";
import Signin from "./components/pages/user/Signin";
import EditProfile from "./components/pages/user/EditProfile";
import Friends from "./components/pages/friends/Friends";
// import axios from "axios";

const Routes6 = () => {
  // const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <>
            <Navbar links={linksArray} />
            <Signup />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Navbar links={linksArray} />
            <Signin />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Navbar links={linksArray} />
            <Profile />
          </>
        }
      />
      <Route
        path="/editProfile"
        element={
          <>
            <Navbar links={linksArray} />
            <EditProfile />
          </>
        }
      />
      <Route
        path="/friends"
        element={
          <>
            <Navbar links={linksArray} />
            <Friends />
          </>
        }
      />
      <Route
        path="/hotspots"
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
