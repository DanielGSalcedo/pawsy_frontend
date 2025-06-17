import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown.jsx';
import {PawsyIcon} from '../sign-up/CustomIcons.jsx';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [hasToken, setHasToken] = React.useState(false);

  React.useEffect(() => {
    setHasToken(!!localStorage.getItem('token'));
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
            <PawsyIcon />
            <Typography
                variant="h6"
                gutterBottom
                sx={{ border: '20px', padding: '4px' }}
            >
              Pawsy
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!hasToken && (
              <>
                <Button color="primary" variant="text" size="small" onClick={
                    () => {
                        window.location.href = '/sign-in';
                    }
                }>
                  Sign in
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={
                  ()=> {
                    window.location.href = '/sign-up';
                  }
                }>
                  Sign up
                </Button>
              </>
            )}
            {hasToken && (
              <>
                <Button color="secondary" variant="outlined" size="small" onClick={handleLogout}>
                  Log out
                </Button>
                <IconButton
                  color="primary"
                  aria-label="User profile"
                  onClick={() => window.location.href = '/user-profile'}
                  sx={{ ml: 1 }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {!hasToken && (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" fullWidth>
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" fullWidth>
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
                {hasToken && (
                  <>
                    <MenuItem>
                      <Button color="secondary" variant="outlined" fullWidth onClick={handleLogout}>
                        Log out
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <IconButton
                        color="primary"
                        aria-label="User profile"
                        onClick={() => window.location.href = '/user-profile'}
                        sx={{ width: '100%' }}
                      >
                        <AccountCircleIcon fontSize="large" />
                        <span style={{ marginLeft: 8 }}>Perfil</span>
                      </IconButton>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
