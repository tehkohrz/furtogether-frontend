import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tabs,
  Tab,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const linksArray = [
  { name: "Home", url: "/" },
  { name: "Friends", url: "/friends" },
  { name: "HotSpots", url: "/hotspots" },
  { name: "My Info", url: "/profile" },
];

const Navbar = ({ links }) => {
  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  return (
    <AppBar
      style={{ background: "#3dccc7" }}
    >
      <Toolbar>
        <Grid item xs={6}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            {links.map((link, index) => (
              <Tab
                value={index}
                key={`navbar-${index}`}
                label={link.name}
                onClick={() => navigate(link.url)}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Box display="flex">
            <Button
              sx={{
                marginLeft: 4,
                background: "#282C35",
              }} /* " rgba(252,176,69,1)"  */
              variant="contained"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>

            <Button
              sx={{ marginLeft: 3, background: "#282C35" }}
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar, linksArray };
