import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import PetsIcon from '@mui/icons-material/Pets';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import axios from 'axios'; // Activar luego para conexión real

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

const Field = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

const StyledInput = styled('input')(({ theme }) => ({
  // width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  outline: 'none',
  BoxSizing: 'border-box',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

const StyledTextarea = styled('textarea')(({ theme }) => ({
  // width: '100%',
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
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setForm({
        nombre: 'Max',
        tipo: 'Perro',
        edad: '3',
        descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
      });
    }, 500);

    return () => clearTimeout(timer);

    // Código real backend:
    // axios.get(`http://localhost:4000/api/pets/${id}`)
    //   .then(res => setForm(res.data))
    //   .catch(err => console.error(err));
  }, [id]);

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
      navigate(`/perfil/${id}`);
    }, 1000);

    // Código real backend:
    // axios.put(`http://localhost:4000/api/pets/${id}`, form)
    //   .then(() => navigate(`/perfil/${id}`))
    //   .catch(err => {
    //     alert("Error al guardar");
    //     setSaving(false);
    //   });
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
          <Stack alignItems="center" spacing={1}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 72,
                height: 72,
                boxShadow: 3,
                background: theme =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              <PetsIcon fontSize="large" sx={{ color: 'white' }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Editar Mascota
            </Typography>
          </Stack>

          <Divider />

          <Box component="form" onSubmit={handleSubmit}>
            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Nombre *
              </Typography>
              <StyledInput
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Tipo *
              </Typography>
              <StyledInput
                type="text"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Edad
              </Typography>
              <StyledInput
                type="number"
                name="edad"
                value={form.edad}
                onChange={handleChange}
                min={0}
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
