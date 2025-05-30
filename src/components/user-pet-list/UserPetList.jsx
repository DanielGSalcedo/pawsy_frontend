import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Avatar,
  Stack,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import axios from 'axios'; // ← Descomenta cuando conectes backend

const DashboardContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  background:
    theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at center, hsl(222,45%,8%), hsl(220,30%,5%))'
      : 'radial-gradient(circle at center, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0,0,0,0.6)'
      : '0 8px 24px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export default function PetDashboard() {
  const [pets, setPets] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de fetch con setTimeout
    const timer = setTimeout(() => {
      setPets([
        {
          id: 1,
          nombre: 'Max',
          tipo: 'Perro',
          edad: 3,
          descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
        },
        {
          id: 2,
          nombre: 'Luna',
          tipo: 'Gato',
          edad: 2,
          descripcion: 'Muy curiosa y le gusta dormir al sol.',
        },
      ]);
    }, 600);

    return () => clearTimeout(timer);

    // ⚙️ Backend real:
    // axios.get(`http://localhost:4000/api/usuarios/1/mascotas`)
    //   .then(res => setPets(res.data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: 16, right: 16 }} />
      <DashboardContainer>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Mis Mascotas
        </Typography>

        {!pets ? (
          <Stack alignItems="center" mt={6}>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {pets.map(pet => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <StyledCard>
                  <CardContent>
                    <Stack alignItems="center" spacing={1} mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 64,
                          height: 64,
                          boxShadow: 3,
                        }}
                      >
                        <PetsIcon fontSize="medium" />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {pet.nombre}
                      </Typography>
                      <Typography color="text.secondary" fontSize={14}>
                        {pet.tipo} — {pet.edad} años
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {pet.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/perfil/${pet.id}`)}
                    >
                      Ver Perfil
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate(`/editar/${pet.id}`)}
                    >
                      Editar
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </DashboardContainer>
    </AppTheme>
  );
}
