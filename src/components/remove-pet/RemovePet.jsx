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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';

// Estilos idénticos a la vista original
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

// Componente de tarjeta para eliminar
const DeletePetCard = ({ pet, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirmDelete = () => {
    onDelete(pet.id);
    handleCloseDialog();
  };

  return (
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
        
        <Typography variant="h6" fontWeight="bold">
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
          })}
        >
          {pet.descripcion}
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleOpenDialog}
        sx={{ 
          mt: 3,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme => `0 4px 12px ${theme.palette.error.main}40`,
          },
        }}
      >
        Eliminar Mascota
      </Button>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Eliminar a {pet.nombre}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar esta mascota?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

// Componente para estado de carga (idéntico al original)
const LoadingState = () => (
  <Stack alignItems="center" mt={6} spacing={2}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Cargando mascotas...
    </Typography>
  </Stack>
);

// Componente para estado sin mascotas (adaptado)
const EmptyState = ({ navigate }) => (
  <Stack alignItems="center" spacing={3} mt={4}>
    <Typography variant="h6" color="text.secondary">
      No tienes mascotas registradas
    </Typography>
    <Button
      variant="contained"
      onClick={() => navigate('/agregar')}
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

// Datos de ejemplo (mismos que la vista original)
const samplePets = [
  {
    id: 1,
    nombre: 'Max',
    tipo: 'Perro',
    edad: 3,
    descripcion: 'Amigable y juguetón. Le encanta correr en el parque y jugar con pelotas.',
  },
  {
    id: 2,
    nombre: 'Luna',
    tipo: 'Gato',
    edad: 2,
    descripcion: 'Muy curiosa y le gusta dormir al sol. Tímida al principio pero cariñosa cuando confía.',
  },
  {
    id: 3,
    nombre: 'Rocky',
    tipo: 'Perro',
    edad: 5,
    descripcion: 'Tranquilo y protector. Excelente compañero para caminatas largas.',
  },
  {
    id: 4,
    nombre: 'Mia',
    tipo: 'Gato',
    edad: 1,
    descripcion: 'Energética y juguetona. Siempre buscando nuevas aventuras en casa.',
  },
  {
    id: 5,
    nombre: 'Toby',
    tipo: 'Conejo',
    edad: 2,
    descripcion: 'Tranquilo y amigable. Le encanta mordisquear zanahorias y jugar en el jardín.',
  },
];

export default function DeletePetsView() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Función para obtener mascotas (con datos de prueba y preparado para backend)
  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener ID de usuario (ejemplo)
      const userId = localStorage.getItem('userId') || 1;
      
      // *******************************************
      // CONEXIÓN CON BACKEND (DESCOMENTAR CUANDO ESTÉ LISTO)
      // *******************************************
      /*
      // Opción 1: Usando fetch
      const response = await fetch(`http://localhost:4000/api/usuarios/${userId}/mascotas`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setPets(data);
      
      // Opción 2: Usando axios
      /*
      import axios from 'axios';
      const response = await axios.get(`http://localhost:4000/api/usuarios/${userId}/mascotas`);
      setPets(response.data);
      */
      
      // Simular tiempo de respuesta del backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // En desarrollo, usamos datos de ejemplo
      setPets(samplePets);
      
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Error al cargar las mascotas. Mostrando datos de ejemplo.');
      
      // Mostrar datos de ejemplo en caso de error
      setPets(samplePets.slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar mascota (con datos de prueba y preparado para backend)
  const deletePet = async (petId) => {
    try {
      // *******************************************
      // CONEXIÓN CON BACKEND (DESCOMENTAR CUANDO ESTÉ LISTO)
      // *******************************************
      /*
      // Opción 1: Usando fetch
      const response = await fetch(`http://localhost:4000/api/mascotas/${petId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer your-token' // si es necesario
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      // Opción 2: Usando axios
      /*
      import axios from 'axios';
      const response = await axios.delete(`http://localhost:4000/api/mascotas/${petId}`);
      */
      
      // Simular tiempo de eliminación
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actualizar estado local (eliminar de la lista)
      setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
      
      setSuccess('Mascota eliminada correctamente');
      
    } catch (err) {
      console.error('Error deleting pet:', err);
      setError('Error al eliminar la mascota');
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleRetry = () => {
    fetchPets();
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <DashboardContainer direction="column" alignItems="center">
        <Box sx={{ 
          width: '100%', 
          maxWidth: '1200px',
          mb: 4,
          textAlign: 'center',
          position: 'relative' // Para posicionar el botón de volver
        }}>
          {/* Botón para volver atrás */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ 
              position: 'absolute',
              left: '1rem',
              top: '1rem',
              color: 'text.primary'
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ mt: 2, mb: 3 }}
          >
            Gestionar Mascotas
          </Typography>
          
          <Divider sx={{ mb: 4 }} />

          {loading ? (
            <LoadingState />
          ) : error ? (
            <>
              <Stack alignItems="center" mt={3} spacing={2}>
                <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
                  {error}
                </Alert>
                <Button
                  variant="outlined"
                  onClick={handleRetry}
                  sx={{ textTransform: 'none' }}
                >
                  Reintentar conexión
                </Button>
              </Stack>
              
              <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                {pets.map(pet => (
                  <Grid item xs={12} sm={6} md={4} key={pet.id}>
                    <DeletePetCard pet={pet} onDelete={deletePet} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : pets.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {pets.map(pet => (
                <Grid item xs={12} sm={6} md={4} key={pet.id}>
                  <DeletePetCard pet={pet} onDelete={deletePet} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DashboardContainer>
      
      {/* Snackbars para notificaciones */}
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
      
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </AppTheme>
  );
}