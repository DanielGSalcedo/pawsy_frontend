import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';

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
    maxWidth: '500px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function PetEdit() {
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    edad: '',
    descripcion: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setForm({
        nombre: 'Max',
        tipo: 'Perro',
        edad: '3',
        descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Aquí se integraría con un backend real en el futuro
    setTimeout(() => {
      console.log('Mascota actualizada:', form);
      setSaving(false);
      alert('Cambios guardados correctamente (simulado)');
    }, 1000);
  };

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <ProfileContainer direction="column" justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                <PetsIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5">Editar Mascota</Typography>
              <Divider sx={{ width: '100%' }} />

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
              >
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Tipo"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Edad"
                  name="edad"
                  type="number"
                  value={form.edad}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                    label="Descripción"
                    name="descripcion"
                    multiline
                    rows={4}
                    value={form.descripcion}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: !!form.descripcion }}
                />

                <Button type="submit" variant="contained" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </Box>
            </Box>
          </Card>
        )}
      </ProfileContainer>
    </AppTheme>
  );
}
