import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  Stack,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
  Fab, // Nuevo componente añadido
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // Nuevo ícono añadido
import { useNavigate } from 'react-router-dom';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { petApi } from '../../scripts/petApi';

const DashboardContainer = styled(Stack)(({ theme }) => ({
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

const StyledCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 320,
  minWidth: 260,
  minHeight: 380,
  maxHeight: 420,
  margin: 'auto',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      'hsla(220, 30%, 5%, 0.1) 0px 10px 25px 0px, hsla(220, 25%, 10%, 0.1) 0px 20px 45px -5px',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'hsl(222,45%,8%)',
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const AddPetCard = styled(StyledCard)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  minHeight: '350px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.03)',
  },
}));

// Datos de ejemplo para mascotas
// const samplePets = [
//   {
//     id: 1,
//     nombre: 'Max',
//     tipo: 'Perro',
//     edad: 3,
//     descripcion: 'Amigable y juguetón. Le encanta correr en el parque y jugar con pelotas.',
//   },
//   {
//     id: 2,
//     nombre: 'Luna',
//     tipo: 'Gato',
//     edad: 2,
//     descripcion: 'Muy curiosa y le gusta dormir al sol. Tímida al principio pero cariñosa cuando confía.',
//   },
//   {
//     id: 3,
//     nombre: 'Rocky',
//     tipo: 'Perro',
//     edad: 5,
//     descripcion: 'Tranquilo y protector. Excelente compañero para caminatas largas.',
//   },
//   {
//     id: 4,
//     nombre: 'Mia',
//     tipo: 'Gato',
//     edad: 1,
//     descripcion: 'Energética y juguetona. Siempre buscando nuevas aventuras en casa.',
//   },
//   {
//     id: 5,
//     nombre: 'Toby',
//     tipo: 'Conejo',
//     edad: 2,
//     descripcion: 'Tranquilo y amigable. Le encanta mordisquear zanahorias y jugar en el jardín.',
//   },
// ];

// Componente de tarjeta de mascota
const PetCard = ({ pet, navigate }) => (
  <StyledCard>
    <Stack alignItems="center" spacing={1.5}>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          background: theme =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: 4,
        }}
      >
        <PetsIcon fontSize="large" sx={{ color: 'white' }} />
      </Avatar>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          width: '100%',
          maxWidth: 220,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
        title={pet.nombre}
      >
        {pet.nombre}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {pet.tipo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.edad} años
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={theme => ({
          px: 2,
          py: 1.5,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.04)',
          maxHeight: 80,
          minHeight: 60,
          overflowY: 'auto',
          width: '100%',
        })}
      >
        {pet.descripcion}
      </Typography>
    </Stack>
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => navigate(`/perfil/${pet.id}`)}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        Ver Perfil
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate(`/editar/${pet.id}`)}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme => `0 4px 12px ${theme.palette.primary.main}40`,
          },
        }}
      >
        Editar
      </Button>
    </Stack>
  </StyledCard>
);

// Componente para estado de carga
const LoadingState = () => (
  <Stack alignItems="center" mt={6} spacing={2}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Cargando mascotas...
    </Typography>
  </Stack>
);

// Componente para estado sin mascotas
const EmptyState = ({ navigate }) => (
  <Stack alignItems="center" spacing={3} mt={4}>
    <Typography variant="h6" color="text.secondary">
      No tienes mascotas registradas
    </Typography>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={() => navigate('/register-pet')}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        px: 4,
        py: 1.5,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme => `0 4px 12px ${theme.palette.primary.main}40`,
        },
      }}
    >
      Añadir primera mascota
    </Button>
  </Stack>
);

// Componente para estado de error (solo botón de añadir)
const ErrorAddOnly = ({ navigate }) => {
  useEffect(() => {
    alert('Error al cargar las mascotas.');
  }, []);
  return (
    <Stack alignItems="center" spacing={3} mt={4}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/register-pet')}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme => `0 4px 12px ${theme.palette.primary.main}40`,
          },
        }}
      >
        Añadir nueva mascota
      </Button>
    </Stack>
  );
};

export default function UserPetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Ahora usamos petApi.render_pets()
  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener mascotas desde la API
      const data = await petApi.render_pets();
      setPets(data);
      
      // Opción 2: Usando axios (instalar primero: npm install axios)
      /*
      import axios from 'axios';
      const response = await axios.get(`http://localhost:4000/api/usuarios/${userId}/mascotas`);
      setPets(response.data);
      */
      
      // Simular tiempo de respuesta del backend
      // await new Promise(resolve => setTimeout(resolve, 800));
      
      // En desarrollo, usamos datos de ejemplo
      // En producción, deberías usar los datos del backend
      // setPets(samplePets);
      
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Error al cargar las mascotas.');
      setPets([]); // No mostrar ejemplos
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // const handleRetry = () => {
  //   fetchPets();
  // };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <DashboardContainer direction="column" alignItems="center">
        <Box sx={{
          width: '100%',
          maxWidth: '1200px',
          mb: 4,
          textAlign: 'center'
        }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2, mb: 3 }}
          >
            Mis Mascotas
          </Typography>
          <Divider sx={{ mb: 4 }} />
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorAddOnly navigate={navigate} />
          ) : pets.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            <Grid
              container
              spacing={4}
              justifyContent="center"
            >
              {pets.map(pet => (
                <Grid item xs={12} sm={6} md={4} key={pet.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PetCard pet={pet} navigate={navigate} />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <AddPetCard onClick={() => navigate('/register-pet')}>
                  <AddIcon fontSize="large" color="action" sx={{ mb: 1, fontSize: 48 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Añadir nueva mascota
                  </Typography>
                </AddPetCard>
              </Grid>
            </Grid>
          )}
        </Box>
      </DashboardContainer>
      {/* Botón flotante para eliminar mascotas (FAB) */}
      {!loading && pets.length > 0 && !error && (
        <Fab
          color="error"
          aria-label="eliminar"
          onClick={() => navigate('/remove-pet')}
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            backgroundColor: 'error.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'error.dark',
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.2s, background-color 0.2s',
          }}
        >
          <DeleteIcon />
        </Fab>
      )}

      {/* Snackbar para mostrar errores */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </AppTheme>
  );
}