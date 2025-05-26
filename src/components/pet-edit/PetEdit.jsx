import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Avatar,
  Divider,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';

// Contenedor principal con gradiente de fondo
const ProfileContainer = styled(Stack)(({ theme }) => ({
  overflow: 'auto',
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  '&::before': {
    content: '""',
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210,100%,16%,0.5), hsl(220,30%,5%))',
    }),
  },
}));

// Tarjeta central
const Card = styled(MuiCard)(({ theme }) => ({
  width: '100%',
  maxWidth: 520,
  margin: 'auto',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  boxShadow:
    'hsla(220,30%,5%,0.05) 0px 5px 15px, hsla(220,25%,10%,0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    backgroundColor: 'hsl(222,45%,8%)',
    boxShadow:
      'hsla(220,30%,5%,0.5) 0px 5px 15px, hsla(220,25%,10%,0.08) 0px 15px 35px -5px',
  }),
}));

// Wrapper uniforme para cada campo
const Field = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

// Nuevo textarea estilizado
const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  minHeight: 120,
  padding: theme.spacing(1.5),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  resize: 'vertical',
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

export default function PetEdit() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      setForm({
        nombre: 'Max',
        tipo: 'Perro',
        edad: '3',
        descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
      });
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      console.log('Mascota actualizada:', form);
      alert('Cambios guardados (simulado)');
      setSaving(false);
    }, 1000);
  };

  if (!form) {
    return (
      <AppTheme>
        <ProfileContainer justifyContent="center" alignItems="center">
          <CircularProgress />
        </ProfileContainer>
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: 'fixed', top: 16, right: 16 }} />
      <ProfileContainer alignItems="center" justifyContent="center">
        <Card>
          {/* HEADER */}
          <Stack alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, boxShadow: 3 }}>
              <PetsIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Editar Mascota
            </Typography>
          </Stack>

          <Divider />

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit}>
            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Nombre *
              </Typography>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'inherit',
                }}
              />
            </Field>

            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Tipo *
              </Typography>
              <input
                type="text"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'inherit',
                }}
              />
            </Field>

            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Edad
              </Typography>
              <input
                type="number"
                name="edad"
                value={form.edad}
                onChange={handleChange}
                min={0}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'inherit',
                }}
              />
            </Field>

            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Descripción
              </Typography>
              <StyledTextarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </Field>

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
              <Button type="submit" variant="contained" fullWidth disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </ProfileContainer>
    </AppTheme>
  );
}
