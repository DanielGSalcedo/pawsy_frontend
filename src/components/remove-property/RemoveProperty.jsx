import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { propertyApi } from "../../scripts/propertyApi.js";

// Estilos idénticos a la vista original
const DashboardContainer = styled(Stack)(({ theme }) => ({
  overflow: "auto",
  minHeight: "100vh",
  padding: theme.spacing(2),
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

const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minWidth: 0,
  height: 180, // <--- Disminuido el alto de 240 a 180
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      "hsla(220, 30%, 5%, 0.1) 0px 10px 25px 0px, hsla(220, 25%, 10%, 0.1) 0px 20px 45px -5px",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "hsl(222,45%,8%)",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const truncateText = (text, maxLength = 18) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

// Componente de tarjeta para eliminar
const DeletePropertyCard = ({ property, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Confirmación: solo llama a onDelete si el usuario confirma
  const handleConfirmDelete = async () => {
    try {
      const response = await propertyApi.delete_property(property.id);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      onDelete(property.id);
      window.location.href = "/user-properties"; // Redirige a la página de la lista de mascotas
    } catch (err) {
      alert("Error al eliminar la propiedad");
      console.error("Error al eliminar la propiedad:", err);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <StyledCard>
      {/* Imagen y nombre en columna */}
      <Stack alignItems="center" spacing={1} sx={{ minWidth: 120 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: 4,
          }}
        >
          <HomeIcon fontSize="large" sx={{ color: "white" }} />
        </Avatar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            maxWidth: 120,
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={property.nombre}
        >
          {truncateText(property.nombre)}
        </Typography>
      </Stack>
      {/* Info y descripción */}
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexGrow: 1, minWidth: 0 }}
      >
        <Stack spacing={1} alignItems="center" minWidth={100}>
          <Typography variant="body2" color="text.secondary">
            {property.capacidad}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.precioPorNoche} / noche
          </Typography>
        </Stack>
        <Box
          sx={(theme) => ({
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.04)",
            width: 220,
            height: 56,
            overflow: "auto",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              width: "100%",
              maxHeight: 56,
              overflow: "auto",
              textAlign: "center",
              wordBreak: "break-word",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: (theme) => theme.palette.divider,
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: (theme) => theme.palette.text.disabled,
              },
            }}
          >
            {property.descripcion}
          </Typography>
        </Box>
      </Stack>
      {/* Botón eliminar */}
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleOpenDialog}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          maxWidth: 180,
          alignSelf: "center",
          ml: 2,
          "&:hover": {
            boxShadow: (theme) => `0 4px 12px ${theme.palette.error.main}40`,
          },
        }}
      >
        Eliminar Propiedad
      </Button>
      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Eliminar a {property.nombre}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres
            eliminar esta mascota?
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
      Cargando propiedades...
    </Typography>
  </Stack>
);

// Componente para estado sin mascotas (adaptado)
const EmptyState = ({ navigate }) => (
  <Stack alignItems="center" spacing={3} mt={4}>
    <Typography variant="h6" color="text.secondary">
      No tienes propiedades registradas
    </Typography>
    <Button
      variant="contained"
      onClick={() => navigate("/register-property")}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        px: 4,
        py: 1.5,
        boxShadow: "none",
        "&:hover": {
          boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
        },
      }}
    >
      Añadir nueva propiedad
    </Button>
  </Stack>
);

export default function DeletePropertiesView() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Obtener mascotas desde la API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyApi.getUserProperties();
      if (Array.isArray(data) && data.length >= 0) {
        setProperties(data);
      } else {
        throw new Error("Error al cargar las propiedades.");
      }
      // propertyApi.getUserProperties()
      // .then((data) => {
      //     console.log("Propiedades obtenidas:", data);
      //     setProperties([data]);
      //     console.log("Propiedades guardadas:", properties);
      // });
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Error al cargar las propiedades.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar mascota usando el endpoint real
  const deleteProperties = (propertyId) => {
    setProperties((prevPets) =>
      prevPets.filter((property) => property.id !== propertyId)
    );
    setSuccess("Propiedad eliminada correctamente");
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleRetry = () => {
    fetchProperties();
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <AppTheme>
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <DashboardContainer direction="column" alignItems="center">
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mb: 4,
            textAlign: "center",
            position: "relative", // Para posicionar el botón de volver
          }}
        >
          {/* Botón para volver atrás */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              left: "1rem",
              top: "1rem",
              color: "text.primary",
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
            Gestionar Propiedades
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {loading ? (
            <LoadingState />
          ) : error ? (
            <>
              <Stack alignItems="center" mt={3} spacing={2}>
                <Alert severity="error" sx={{ width: "100%", maxWidth: 500 }}>
                  {error}
                </Alert>
                <Button
                  variant="outlined"
                  onClick={handleRetry}
                  sx={{ textTransform: "none" }}
                >
                  Reintentar conexión
                </Button>
              </Stack>
              <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                sx={{ mt: 4 }}
              >
                {properties.map((property) => (
                  <Grid item xs={12} key={property.id} sx={{ width: "100%" }}>
                    <DeletePropertyCard
                      pet={property}
                      onDelete={deleteProperties}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : properties.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            <Grid container spacing={3} direction="column" alignItems="center">
              {properties.map((property) => (
                <Grid item xs={12} key={property.id} sx={{ width: "100%" }}>
                  <DeletePropertyCard
                    property={property}
                    onDelete={deleteProperties}
                  />
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </AppTheme>
  );
}
