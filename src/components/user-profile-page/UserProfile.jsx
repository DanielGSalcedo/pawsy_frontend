import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userApi } from '../../scripts/userApi';
// import axios from 'axios'; // Listo para usar después

const ProfileContainer = styled(Stack)(({ theme }) => ({
  overflow: 'auto',
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'fixed',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '520px',
  },
  borderRadius: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    backgroundColor: 'hsl(222,45%,8%)',
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga desde backend
    // const timer = setTimeout(() => {
    //   setUser({
    //     id,
    //     nombre: 'Pepito Pérez',
    //     email: 'pepitoperez@domain.com',
    //     direccion: 'Calle Falsa 123',
    //     telefono: 1234567890,
    //     avatar: 'https://via.placeholder.com/80',
    //   });
    //   setLoading(false);
    // }, 800);

    // return () => clearTimeout(timer);

    // ⚠️ Código real para usar luego:
    fetchUserProfile().then(data => {setUser(data); setLoading(false);});
  }, [id]);

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <ProfileContainer direction="column" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ alignSelf: 'flex-start', mb: 1, textTransform: 'none' }}
            >
              Volver
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              
              <Typography variant="h5" component="h1" fontWeight="bold" textAlign="center">
                {user.nombre}
              </Typography>

              <Divider sx={{ width: '100%', my: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1"><strong>Teléfono:</strong> {user.telefono}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1"><strong>Tipo:</strong> {user.tipoUsuario}</Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.dark,
                    boxShadow: theme => `0 4px 20px ${theme.palette.primary.main}55`,
                  },
                }}
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.dark,
                    boxShadow: theme => `0 4px 20px ${theme.palette.primary.main}55`,
                  },
                }}
                onClick={() => navigate('/pet-list')}
              >
                My Pets
              </Button>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.dark,
                    boxShadow: theme => `0 4px 20px ${theme.palette.primary.main}55`,
                  },
                }}
                onClick={() => navigate('/user-properties')}
              >
                My Properties
              </Button>

              <Divider sx={{ width: '100%', my: 1 }} />
              <Button
                variant="text"
                fullWidth
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 0, 0, 0.85)',
                  backgroundImage: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    boxShadow: `0 4px 20px ${'red'}55`,
                  },
                }}
                onClick={() => {logOut(); navigate('/');}}
              >
                Log out
              </Button>
            </Box>
          </Card>
        )}
      </ProfileContainer>
    </AppTheme>
  );
}

function logOut(){
  localStorage.removeItem('token');
}
async function fetchUserProfile() {
  const response = await userApi.getUserProfile(localStorage.getItem('token'));
  console.log(response);
  return response;
}
