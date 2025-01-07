import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginButton from './LoginButton';
import { Dashboard, Home } from '@mui/icons-material';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#374151',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <Home />
          </IconButton>

          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/dashboard"
          >
            <Dashboard />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </IconButton>

          <LoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
