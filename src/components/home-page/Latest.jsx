import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const articleInfo = [
  {
    // tag: 'Tipo de propiedad',
    tag: 'Casa',
    // title: 'Título de la propiedad',
    title: 'Hogar con patio grande para mascotas',
    // description: 'Descripción breve de la propiedad',
    description:
        'Una casa amplia con jardín cercado, perfecta para perros grandes o muy activos. Ofrece espacios seguros y cómodos para jugar.',
    // authors: [{ name: 'Nombre del dueño', avatar: 'ruta_avatar' }]
    authors: [
      { name: 'Juan Rodríguez', avatar: '/static/images/avatar/1.jpg' },
    ],
  },
  {
    tag: 'Apartamento',
    title: 'Apartamento pet-friendly en el centro',
    description:
        'Moderno apartamento en el corazón de la ciudad, ideal para mascotas pequeñas. Cercano a parques y áreas verdes.',
    authors: [
      { name: 'Laura Gómez', avatar: '/static/images/avatar/2.jpg' },
    ],
  },
  {
    tag: 'Finca',
    title: 'Finca con espacios naturales para tu mascota',
    description:
        'Lugar campestre con senderos y zonas verdes donde las mascotas pueden correr libremente y disfrutar de la naturaleza.',
    authors: [
      { name: 'Carlos Pérez', avatar: '/static/images/avatar/3.jpg' },
    ],
  },
  {
    tag: 'Habitación',
    title: 'Habitación privada para tu peludo',
    description:
        'Ofrecemos una habitación tranquila, limpia y equipada con cama especial para mascotas pequeñas y medianas.',
    authors: [
      { name: 'Andrea Ruiz', avatar: '/static/images/avatar/4.jpg' },
    ],
  },
  {
    tag: 'Casa',
    title: 'Casa con terraza techada y zona de juegos',
    description:
        'Espacio diseñado especialmente para estancias largas. Cuenta con terraza segura y juguetes disponibles para mascotas.',
    authors: [
      { name: 'Miguel Torres', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    tag: 'Habitación',
    title: 'Habitación acogedora con supervisión 24/7',
    description:
        'Ofrecemos cuidado constante y cariño para tu mascota. Ideal para estancias nocturnas o fines de semana.',
    authors: [
      { name: 'Sofía Martínez', avatar: '/static/images/avatar/6.jpg' },
    ],
  },
  {
    tag: 'Apartamento',
    title: 'Apartamento con balcón seguro',
    description:
        'Perfecto para mascotas curiosas que aman observar desde las alturas. El balcón está enmallado para mayor seguridad.',
    authors: [
      { name: 'Diego Herrera', avatar: '/static/images/avatar/7.jpg' },
    ],
  },
  {
    tag: 'Casa',
    title: 'Casa familiar que ama los animales',
    description:
        'Vivimos con 2 perros y sabemos lo importante que es que tu mascota se sienta en familia. ¡Aquí será uno más del hogar!',
    authors: [
      { name: 'Valentina López', avatar: '/static/images/avatar/8.jpg' },
    ],
  },
  {
    tag: 'Finca',
    title: 'Finca en las afueras con alojamiento especial',
    description:
        'Alojamiento adaptado para mascotas grandes, con corral externo, cama elevada y agua fresca disponible siempre.',
    authors: [
      { name: 'Luis Ramírez', avatar: '/static/images/avatar/9.jpg' },
    ],
  },
  {
    tag: 'Habitación',
    title: 'Mini suite con aire acondicionado',
    description:
        'Espacio climatizado con alfombra antideslizante y juguetes. Ideal para mascotas consentidas.',
    authors: [
      { name: 'Mariana Vélez', avatar: '/static/images/avatar/10.jpg' },
    ],
  },
];

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Comentarios
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {articleInfo.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>

              <Author authors={article.authors} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
      </Box>
    </div>
  );
}
