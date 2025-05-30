import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { PawsyIcon } from "../sign-up/CustomIcons";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { userApi } from "../../scripts/userApi";

const RegisterPetContainer = styled(Stack)(({ theme }) => ({
  height: "calc(100vh - 80px)", // Fijo para ocupar toda la pantalla menos el margen
  minWidth: "calc(100vw - 80px)",
  margin: 40,
  padding: theme.spacing(2),
  boxSizing: "border-box",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "fixed",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  width: "100%",
  height: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 0,
  overflow: "scroll",
  scrollbarWidth: "none",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "100%",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

// Función para obtener tipos de mascota desde un endpoint (simulada)
// async function fetchPetTypes() {
//   const response = await fetch('/api/pet-types');
//   return await response.json();
// }

export default function RegisterPet(props) {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [edad, setEdad] = React.useState("");
  const [tipo, setTipo] = React.useState(0);
  const [descripcion, setDescripcion] = React.useState("");
  const [nombre, setNombre] = React.useState("");

  // const [tipos, setTipos] = React.useState([]);
  // React.useEffect(() => {
  //   fetchPetTypes().then(setTipos);
  // }, []);

  const validateInputs = () => {
    let isValid = true;
    if (!nombre || nombre.length < 1) {
      setNameError(true);
      setNameErrorMessage("El nombre es obligatorio.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    const pet = {
      nombre,
      descripcion,
      tipo: Number(tipo),
      edad: Number(edad),
      propietario: 0,
    };
    console.log("JSON a enviar:", JSON.stringify(pet));
    userApi.register_pet(pet);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <RegisterPetContainer direction="column" justifyContent="center">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <PawsyIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Registrar Mascota
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            {/* Columna izquierda: área de carga de foto */}
            <Box
              sx={{
                width: 180,
                height: 180,
                border: "2px dashed #aaa",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f9f9f9",
                color: "#888",
                flexShrink: 0,
                cursor: "pointer",
                transition: "border-color 0.2s",
                "&:hover": { borderColor: "#1976d2", color: "#1976d2" },
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
            </Box>

            {/* Columna derecha: campos */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              {/* Línea 1: Nombre */}
              <TextField
                label="Nombre de la mascota"
                error={nameError}
                helperText={nameErrorMessage}
                id="pet_name"
                name="pet_name"
                placeholder="Firulais"
                required
                fullWidth
                variant="outlined"
                color={nameError ? "error" : "primary"}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {/* Línea 2: Edad y Tipo */}
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <TextField
                  label="Edad"
                  id="pet_edad"
                  name="pet_edad"
                  type="number"
                  placeholder="0"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="pet_tipo_label">Tipo</InputLabel>
                  <Select
                    labelId="pet_tipo_label"
                    id="pet_tipo"
                    name="pet_tipo"
                    value={tipo}
                    label="Tipo"
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <MenuItem value={0}>Perro</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              {/* Línea 3: Descripción */}
              <FormControl fullWidth>
                <FormLabel htmlFor="pet_descripcion" sx={{ mb: 1 }}>
                  Descripción
                </FormLabel>
                <Box
                  component="textarea"
                  id="pet_descripcion"
                  name="pet_descripcion"
                  placeholder="Describe a tu mascota"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    resize: "vertical",
                    fontSize: "1rem",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </FormControl>
            </Stack>
          </Box>
        </Card>
      </RegisterPetContainer>
    </AppTheme>
  );
}
