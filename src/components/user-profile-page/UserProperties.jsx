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
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { propertyApi } from "../../scripts/propertyApi";

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
  flexDirection: "column",
  width: "100%",
  maxWidth: 340,
  minWidth: 260,
  minHeight: 380,
  maxHeight: 440,
  margin: "auto",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
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

const AddPropertyCard = styled(StyledCard)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: "transparent",
  minHeight: "350px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.03)",
  },
}));

// Componente de tarjeta de propiedad
const PropertyCard = ({ property, navigate }) => (
  <StyledCard>
    <Stack alignItems="center" spacing={1.5}>
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
          width: "100%",
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
        title={property.nombre}
      >
        {property.nombre}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          width: "100%",
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
        title={property.direccion}
      >
        {property.direccion}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Capacidad: {property.capacidad}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${property.precioPorNoche} / noche
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={(theme) => ({
          px: 2,
          py: 1.5,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.04)",
          maxHeight: 80,
          minHeight: 60,
          overflowY: "auto",
          width: "100%",
        })}
      >
        {property.descripcion}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          width: "100%",
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
        title={property.servicios?.map((s) => s.nombre).join(", ")}
      >
        Servicios:{" "}
        {property.servicios?.map((s) => s.nombre).join(", ") || "Ninguno"}
      </Typography>
    </Stack>
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => navigate(`/propiedad/${property.id}`)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
        }}
      >
        Ver Detalle
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate(`/editar-propiedad/${property.id}`)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
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
      Cargando propiedades...
    </Typography>
  </Stack>
);

// Componente para estado sin propiedades
const EmptyState = ({ navigate }) => (
  <Stack alignItems="center" spacing={3} mt={4}>
    <Typography variant="h6" color="text.secondary">
      No hay propiedades registradas
    </Typography>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
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
      Añadir primera propiedad
    </Button>
  </Stack>
);

// Componente para estado de error (solo botón de añadir)
const ErrorAddOnly = ({ navigate }) => {
  useEffect(() => {
    alert("Error al cargar las propiedades.");
  }, []);
  return (
    <Stack alignItems="center" spacing={3} mt={4}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
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
};

export default function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener propiedades desde la API
      const data = await propertyApi.getUserProperties();
      if (Array.isArray(data) && data.length > 0) {
        setProperties(data);
      } else {
        throw new Error("No se encontraron propiedades");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Error al cargar las propiedades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCloseError = () => {
    setError(null);
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
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2, mb: 3 }}
          >
            Propiedades
          </Typography>
          <Divider sx={{ mb: 4 }} />
          {loading ? (
            <LoadingState />
          ) : error ? (
            <Typography variant="h6" color="text.secondary">
              Sólo los cuidadores pueden tener propiedades
            </Typography>
          ) : properties.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              No tienes propiedades registradas
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {properties.map((property) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={property.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <PropertyCard property={property} navigate={navigate} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DashboardContainer>
      {/* Snackbar para mostrar errores */}
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
    </AppTheme>
  );
}
