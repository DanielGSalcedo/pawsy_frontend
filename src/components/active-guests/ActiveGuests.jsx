import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { rentsApi } from '../../scripts/rentsApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

export default function ActiveGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGuests() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const data = await rentsApi.getAllGuests_Active(token);
        // Ordenar por fecha de inicio ascendente (más antigua primero)
        data.sort((a, b) => new Date(a['fecha inicio']) - new Date(b['fecha inicio']));
        setGuests(data);
      } catch (err) {
        setError('Error trayendo sus datos');
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
  }, []);

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <DashboardContainer direction="column" alignItems="center">
        <Box sx={{ width: '100%', maxWidth: '900px', mb: 4, textAlign: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/user-profile')}
            sx={{ mb: 2, textTransform: 'none', alignSelf: 'flex-start' }}
          >
            Volver a mi perfil
          </Button>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2, mb: 3 }}
          >
            Inquilinos Activos
          </Typography>
          <Divider sx={{ mb: 4 }} />
          {loading ? (
            <Stack alignItems="center" mt={6} spacing={2}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Cargando inquilinos...
              </Typography>
            </Stack>
          ) : error ? (
            <Typography variant="h6" color="error" sx={{ mt: 4 }}>
              {error}
            </Typography>
          ) : guests.length === 0 ? (
            <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
              No posee inquilinos activos
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Fecha inicio</b></TableCell>
                    <TableCell><b>Fecha fin</b></TableCell>
                    <TableCell><b>Mascota</b></TableCell>
                    <TableCell><b>Propiedad</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guests.map((rent, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{formatDate(rent['fecha inicio'])}</TableCell>
                      <TableCell>{formatDate(rent['fecha fin'])}</TableCell>
                      <TableCell>
                        {rent.pet
                          ? `${rent.pet.nombre} (${rent.pet.tipo || ''})`
                          : `ID: ${rent.mascotaId}`}
                      </TableCell>
                      <TableCell>
                        {rent.property
                          ? rent.property.nombre
                          : `ID: ${rent.propiedadId}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </DashboardContainer>
    </AppTheme>
  );
}
