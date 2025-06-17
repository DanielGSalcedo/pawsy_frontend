import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { propertyApi } from "../../scripts/propertyApi";
import { petApi } from "../../scripts/petApi";

const ProfileContainer = styled(Stack)(({ theme }) => ({
  overflow: "auto",
  minHeight: "100vh",
  padding: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
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
  alignSelf: "center",
  width: "100%",
  maxWidth: "700px",
  padding: theme.spacing(5),
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    backgroundColor: "hsl(222,45%,8%)",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SeeProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    setLoading(true);
    propertyApi
      .get_property_by_id(id)
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOpenDialog = async () => {
    setStartDate("");
    setEndDate("");
    setSelectedPet("");
    setDateError("");
    // Obtener mascotas solo al abrir el dialog
    try {
      const petsData = await petApi.render_pets();
      setPets(petsData);
    } catch {
      setPets([]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    // Validación simple de fechas
    if (!startDate || !endDate || !selectedPet) {
      setDateError("Todos los campos son obligatorios.");
      return;
    }
    if (endDate <= startDate) {
      setDateError("La fecha de fin debe ser posterior a la de inicio.");
      return;
    }
    // Aquí iría la lógica de agendar (API), pero solo redirigimos
    setOpenDialog(false);
    navigate("/properties-menu");
  };

  const handleCancel = () => {
    setOpenDialog(false);
    navigate("/pet-list");
  };

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <ProfileContainer
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {loading ? (
          <CircularProgress />
        ) : property ? (
          <Card variant="outlined">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/properties-menu")}
              sx={{ alignSelf: "flex-start", mb: 1, textTransform: "none" }}
            >
              Volver
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: 4,
                  mb: 2,
                }}
              >
                <HomeIcon fontSize="large" sx={{ color: "white" }} />
              </Avatar>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                {property.nombre}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                {property.direccion}
              </Typography>
              <Divider sx={{ width: "100%", my: 1 }} />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Typography variant="body2" color="text.secondary">
                  <strong>Capacidad:</strong> {property.capacidad}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Precio por noche:</strong> ${property.precioPorNoche}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                <strong>Descripción:</strong> {property.descripcion}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                <strong>Propietario:</strong> {property.usuario?.nombre} (
                {property.usuario?.email})
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                <strong>Servicios:</strong>{" "}
                {property.servicios?.map((s) => s.nombre).join(", ") || "Ninguno"}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    boxShadow: (theme) =>
                      `0 4px 20px ${theme.palette.primary.main}55`,
                  },
                }}
                onClick={handleOpenDialog}
              >
                Agendar
              </Button>
            </Box>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>Agendar propiedad</DialogTitle>
              <DialogContent>
                <Stack spacing={2} mt={1}>
                  <TextField
                    label="Fecha de inicio"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Fecha de fin"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    error={!!dateError && endDate && endDate <= startDate}
                    helperText={
                      !!dateError && endDate && endDate <= startDate
                        ? "La fecha de fin debe ser posterior a la de inicio."
                        : ""
                    }
                  />
                  <TextField
                    select
                    label="Mascota"
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                    fullWidth
                  >
                    {pets.length === 0 ? (
                      <MenuItem value="" disabled>
                        No tienes mascotas registradas
                      </MenuItem>
                    ) : (
                      pets.map((pet) => (
                        <MenuItem key={pet.id} value={pet.id}>
                          {pet.nombre}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                  {dateError && (
                    <Typography color="error" variant="body2">
                      {dateError}
                    </Typography>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="secondary">
                  Cancelar
                </Button>
                <Button onClick={handleConfirm} variant="contained">
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        ) : (
          <Typography color="error">No se pudo cargar la propiedad.</Typography>
        )}
      </ProfileContainer>
    </AppTheme>
  );
}
