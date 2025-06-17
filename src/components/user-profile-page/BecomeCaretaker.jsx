import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Divider,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { userApi } from "../../scripts/userApi";
// import axios from 'axios'; // Activar luego para conexión real

const ProfileContainer = styled(Stack)(({ theme }) => ({
  overflow: "auto",
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
  "&::before": {
    content: '""',
    position: "fixed",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210,100%,16%,0.5), hsl(220,30%,5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  maxWidth: 520,
  margin: "auto",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  boxShadow:
    "hsla(220,30%,5%,0.05) 0px 5px 15px, hsla(220,25%,10%,0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    backgroundColor: "hsl(222,45%,8%)",
    boxShadow:
      "hsla(220,30%,5%,0.5) 0px 5px 15px, hsla(220,25%,10%,0.08) 0px 15px 35px -5px",
  }),
}));

const Field = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
}));

const StyledInput = styled("input")(({ theme }) => ({
  // width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  outline: "none",
  BoxSizing: "border-box",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

const StyledTextarea = styled("textarea")(({ theme }) => ({
  // width: '100%',
  minHeight: 120,
  padding: theme.spacing(1.5),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  resize: "vertical",
  outline: "none",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));

export default function BecomeCaretaker() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    setForm({
      telefono: ""
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSaving(true);
    // setTimeout(() => {
    //   console.log('Mascota actualizada:', form);
    //   alert('Cambios guardados (simulado)');
    //   setSaving(false);
    //   navigate(`/perfil/${id}`);
    // }, 1000);

    if (becomeCaretaker(form.telefono)) {
      alert("Cambios guardados correctamente");
      setSaving(false);
      navigate(`/user-profile`);
    }
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
      <ColorModeSelect sx={{ position: "fixed", top: 16, right: 16 }} />
      <ProfileContainer alignItems="center" justifyContent="center">
        <Card>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h5" fontWeight="bold">
              Convertirse a cuidador
            </Typography>
          </Stack>

          <Divider />

          <Box component="form" onSubmit={handleSubmit}>
            <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Teléfono *
              </Typography>
              <StyledInput
                type="number"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </Field>
            {/* <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Ser cuidador *
              </Typography>
              <StyledInput
                type="checkbox"
                name="cuidador"
                value={form.cuidador}
                onChange={handleChange}
                required
              />
            </Field> */}
            {/* <FormControlLabel
              control={<Checkbox value="cuidador" color="primary" />}
              label="Ser cuidador *"
            /> */}

            {/* <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Email *
              </Typography>
              <StyledInput
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Field> */}

            {/* <Field>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Dirección
              </Typography>
              <StyledInput
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                min={0}
              />
            </Field> */}

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </Stack>
          </Box>
        </Card>
      </ProfileContainer>
    </AppTheme>
  );
}

async function becomeCaretaker(telefono) {
  const response = await userApi.becomeCaretaker(
    localStorage.getItem("token"),
    telefono
  );
  console.log(response);
  if (!response.ok) {
    alert("Error al guardar el perfil");
    console.error("Error al guardar el perfil: ", response);
    return false;
  } else return true;
}
