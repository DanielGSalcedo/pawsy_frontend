import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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

export default function PetProfile() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPet({
        nombre: 'Max',
        tipo: 'Perro',
        edad: 3,
        descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <ProfileContainer direction="column" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined">
            {/* Botón de Volver */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ alignSelf: 'flex-start', mb: 1, textTransform: 'none' }}
            >
              Volver
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, boxShadow: 3 }}>
                <PetsIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" component="h1" fontWeight="bold">
                Perfil de {pet.nombre}
              </Typography>
              <Divider sx={{ width: '100%', my: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <CategoryIcon color="action" />
                <Typography variant="body1"><strong>Tipo:</strong> {pet.tipo}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon color="action" />
                <Typography variant="body1"><strong>Edad:</strong> {pet.edad} años</Typography>
              </Stack>

              <Typography variant="body1" sx={{ mt: 2 }}><strong>Descripción:</strong></Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  px: 2,
                  backgroundColor: theme => theme.palette.action.hover,
                  borderRadius: 1,
                  py: 1,
                }}
              >
                {pet.descripcion}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, textTransform: 'none' }}
                onClick={() => navigate('/editar')}
              >
                Editar perfil
              </Button>
            </Box>
          </Card>
        )}
      </ProfileContainer>
    </AppTheme>
  );
}
