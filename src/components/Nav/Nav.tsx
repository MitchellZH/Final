import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import  { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import  { useEffect, useState } from 'react';

export default function Nav() {
  const [user, setUser] = useState({
    id: '',
    email: ''
  })

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        if(typeof email === 'string') {
          setUser({
            id: uid,
            email: email,
          });
        }
      } 
    });
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser({
        id: '',
        email: ''
      })
    }).catch((error) => {
      alert(error)
    });
  }
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            Cookbook Connect
          </Typography>
          {/* {responsive menu} */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user.id ? (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      color={"black"}
                      onClick={() => handleLogout()}
                    >
                      Log Out
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/my-recipes"}>
                      <Typography textAlign="center" color={"black"}>
                        My Recipes
                      </Typography>
                    </Link>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/log-in"}>
                      <Typography textAlign="center" color={"black"}>
                        Log In
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/register"}>
                      <Typography textAlign="center" color={"black"}>
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            Cookbook Connect
          </Typography>
          {/* {end responsive menu} */}

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {user.id && (
              <Button disabled sx={{ my: 2, display: "block" }}>
                <Typography variant="subtitle1">
                  <b>{user.email}</b>
                </Typography>
              </Button>
            )}
            {user.id ? (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/my-recipes">My Recipes</Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/" onClick={() => {handleCloseNavMenu(); handleLogout();}}>
                    Log Out
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/log-in">Log In</Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}