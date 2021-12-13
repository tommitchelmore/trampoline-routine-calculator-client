import { AppBar, IconButton, Toolbar, Box, Tooltip, Avatar, Menu, MenuItem, Typography, Container, Button, Slide, useScrollTrigger, Link, Stack, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from '@mui/icons-material/AccountCircle';
import React from 'react';
import { useUser } from '../store';

function Layout (props) {

  const user = useUser(state => state.user)
  const logout = useUser(state => state.logout)

  const pages = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Library',
      href: '/library'
    },
    {
      title: 'Calculator',
      href: '/calculator'
    },
    {
      title: 'My Routines',
      href: '/routines'
    }
  ]

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <div>
      <AppBar >
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(({title, href}) => (
                <Button
                  onClick={handleCloseNavMenu}
                  to={href}
                  component={RouterLink}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  key={title}
                >
                  {title}
                </Button>
              ))}
              {(user?.role === 'contributor' || user?.role === 'admin') && <Button
                onClick={handleCloseNavMenu}
                to='/contributor'
                component={RouterLink}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Contributor
              </Button>}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({title, href}) => (
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Link to={href} component={RouterLink} underline='none' color='white'>
                      {title}
                    </Link>
                  </MenuItem>
                ))}
                {user?.role === 'admin' && <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/admin' component={RouterLink} underline='none' color='white'>
                    Admin
                  </Link>
                </MenuItem>}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user && 
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Profile />
                  </IconButton>
                </Tooltip>
              }
              {!user && <Button sx={{'color': 'white'}} to="/signin" component={RouterLink}>Sign in</Button>}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user?.role === 'admin' && <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/admin' component={RouterLink} underline='none' color='white'>Admin</Link>
                </MenuItem>}
                <MenuItem onClick={() => {handleCloseUserMenu(); logout()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Box sx={{bgcolor: 'background.paper'}}>
        <Container>
          <Stack gap={4} py={4}>
            {props.children}
          </Stack>
        </Container>
      </Box>
      <Box py={2}>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Link variant="body2" underline='hover' color='text.secondary' href="https://tommitchelmore.com" target="_blank" rel="noopener">
                © 2021 Thomas Mitchelmore
              </Link>
            </Grid>
            <Grid item xs={12} md={6} textAlign={'right'}>
              <Link variant="body2" underline='hover' color='text.secondary' href="https://github.com/tommitchelmore/trampoline_routine_calculator" target="_blank" rel="noopener">
                View source (github)
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Layout;