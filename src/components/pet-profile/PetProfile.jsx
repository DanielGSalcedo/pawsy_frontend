import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import Avatar from "@mui/material/Avatar";
import PetsIcon from "@mui/icons-material/Pets";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { petApi } from "../../scripts/petApi";

const ProfileContainer = styled(Stack)(({ theme }) => ({
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

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "520px",
  },
  borderRadius: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    backgroundColor: "hsl(222,45%,8%)",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // let isMounted = true;
    setLoading(true);
    const fetchPet = async () => {
      const response = await petApi.get_pet_by_id(id);
      setPet({
        id: response.id,
        nombre: response.nombre,
        tipo: response.tipo || "Tipo desconocido",
        edad: response.edad,
        descripcion: response.descripcion,
      });
      setLoading(false);
    };
    // petApi.get_pet_by_id(id)
    //   .then(data => {
    //     if (isMounted && data && data.id) {
    //       console.log("hola");
    //       setPet({
    //         id: data.id,
    //         nombre: data.nombre,
    //         tipo: data.tipo || 'Tipo desconocido',
    //         edad: data.edad,
    //         descripcion: data.descripcion,
    //       });
    //     } else {
    //       // throw new Error('Mascota no encontrada');
    //     }
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     alert('No se pudo obtener la mascota. Mostrando datos simulados.');
    //     console.error('Error al obtener la mascota:', err);
    //     if (isMounted) {
    //       setPet({
    //         id,
    //         nombre: 'Max',
    //         tipo: 'Perro',
    //         edad: 3,
    //         descripcion: 'Amigable y juguetón. Le encanta correr en el parque.',
    //       });
    //       setLoading(false);
    //     }
    //   });
    fetchPet();
    return () => {
      // isMounted = false;
    };
  }, [id]);

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
        ) : (
          <Card variant="outlined">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
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
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <PetsIcon fontSize="large" sx={{ color: "white" }} />
              </Avatar>

              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                textAlign="center"
              >
                Perfil de {pet.nombre}
              </Typography>

              <Divider sx={{ width: "100%", my: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <CategoryIcon color="action" />
                <Typography variant="body1">
                  <strong>Tipo:</strong> {pet.tipo}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon color="action" />
                <Typography variant="body1">
                  <strong>Edad:</strong> {pet.edad} años
                </Typography>
              </Stack>

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Descripción:</strong>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={(theme) => ({
                  textAlign: "center",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontStyle: "italic",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.04)",
                })}
              >
                {pet.descripcion}
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
                onClick={() => navigate(`/pet-edit/${id}`)}
              >
                Editar perfil
              </Button>
            </Box>
          </Card>
        )}
      </ProfileContainer>
    </AppTheme>
  );
}
