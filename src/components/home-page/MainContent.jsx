import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { PawsyIcon, PawsyIconLarge } from '../sign-up/CustomIcons.jsx';
import PropiedadesList from "./PropiedadesList.jsx";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

function Author({ authors }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
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

export function Search() {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

const NAVS = [
    { label: '¿Qué es Pawsy?', value: 'que-es' },
    { label: '¿Por qué usar Pawsy?', value: 'por-que' },
    { label: 'Algunos Lugares', value: 'lugares' },
];

// FadeSlideTransition: para fade y slide entre secciones/carrusel
function FadeSlideTransition({ children, triggerKey, direction = 'left', duration = 400 }) {
    const [show, setShow] = React.useState(true);
    const [display, setDisplay] = React.useState(children);
    const [slideDir, setSlideDir] = React.useState(direction);

    React.useEffect(() => {
        setShow(false);
        // Espera el fade out antes de cambiar el contenido
        const timeout = setTimeout(() => {
            setDisplay(children);
            setSlideDir(direction);
            setShow(true);
        }, duration / 2);
        return () => clearTimeout(timeout);
    }, [triggerKey, direction, children, duration]);

    return (
        <Box
            sx={{
                transition: `opacity ${duration / 2}ms, transform ${duration}ms`,
                opacity: show ? 1 : 0,
                transform: show
                    ? 'translateX(0)'
                    : slideDir === 'left'
                        ? 'translateX(-40px)'
                        : 'translateX(40px)',
                willChange: 'opacity, transform',
            }}
        >
            {display}
        </Box>
    );
}

function QueEsPawsy() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: 6,
                mb: 6,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    width: '100%',
                }}
            >
                <PawsyIconLarge sx={{ width: { xs: 180, sm: 220, md: 260, lg: 300 }, height: { xs: 180, sm: 220, md: 260, lg: 300 } }} />
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '2.8rem', sm: '4rem', md: '5rem', lg: '6rem' },
                        letterSpacing: 2,
                        lineHeight: 1.1,
                        mb: 0,
                    }}
                    gutterBottom
                >
                    PAWSY
                </Typography>
            </Box>
            <Typography
                align="center"
                sx={{
                    maxWidth: 700,
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                    fontWeight: 400,
                    lineHeight: 1.5,
                    mt: 3,
                }}
            >
                Pawsy es un servicio tipo AirBnb pero para mascotas. Permite a los dueños encontrar cuidadores confiables que ofrecen alojamiento y otros servicios para sus mascotas, dependiendo del arrendador ("cuidador"). Así, puedes viajar o ausentarte con la tranquilidad de que tu mascota estará en buenas manos.
            </Typography>
        </Box>
    );
}

// Carrusel para "¿Por qué usar Pawsy?"
const porquePawsyParrafos = [
    "Plataforma especializada en mascotas, no solo alojamiento tradicional.",
    "Opciones de cuidadores verificados y calificados por otros usuarios.",
    "Servicios adicionales como paseos, alimentación especial, medicación y más.",
    "Comunicación directa y transparente con el cuidador.",
    "Flexibilidad de fechas y tipos de alojamiento según la necesidad de tu mascota."
];

function PorQuePawsy() {
    const [idx, setIdx] = React.useState(0);
    const [slideDir, setSlideDir] = React.useState('left');
    const total = porquePawsyParrafos.length;

    const handlePrev = () => {
        setSlideDir('right');
        setIdx(idx === 0 ? total - 1 : idx - 1);
    };
    const handleNext = () => {
        setSlideDir('left');
        setIdx(idx === total - 1 ? 0 : idx + 1);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            mt: 6,
            mb: 6,
            minHeight: 280,
        }}>
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                    letterSpacing: 1,
                }}
                gutterBottom
            >
                ¿Por qué usar Pawsy?
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: { xs: '100%', sm: 500 },
                    maxWidth: '100%',
                    minHeight: 120,
                    position: 'relative',
                }}
            >
                <IconButton
                    aria-label="Anterior"
                    onClick={handlePrev}
                    sx={{
                        fontSize: 32,
                        mr: 2,
                        bgcolor: 'transparent',
                        '&:hover': { bgcolor: 'action.hover' },
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="medium" />
                </IconButton>
                <Box
                    sx={{
                        flex: 1,
                        overflow: 'hidden',
                        minHeight: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2,
                    }}
                >
                    <FadeSlideTransition
                        triggerKey={idx}
                        direction={slideDir}
                        duration={400}
                    >
                        <Typography
                            align="center"
                            sx={{
                                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' },
                                fontWeight: 500,
                                transition: 'all 0.3s',
                                minHeight: 80,
                            }}
                        >
                            {porquePawsyParrafos[idx]}
                        </Typography>
                    </FadeSlideTransition>
                </Box>
                <IconButton
                    aria-label="Siguiente"
                    onClick={handleNext}
                    sx={{
                        fontSize: 32,
                        ml: 2,
                        bgcolor: 'transparent',
                        '&:hover': { bgcolor: 'action.hover' },
                    }}
                >
                    <ArrowForwardIosIcon fontSize="medium" />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {porquePawsyParrafos.map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: idx === i ? 'primary.main' : 'grey.400',
                            transition: 'background 0.2s',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

function Lugares() {
    return (
        <Box sx={{ mt: 4 }}>
            {/* Dejar en blanco por ahora */}
        </Box>
    );
}

export default function MainContent() {
    const [selectedNav, setSelectedNav] = React.useState('que-es');
    const [prevNav, setPrevNav] = React.useState('que-es');
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    // Detecta dirección para la transición entre secciones
    const navOrder = ['que-es', 'por-que', 'lugares'];
    const getDirection = (from, to) => {
        const fromIdx = navOrder.indexOf(from);
        const toIdx = navOrder.indexOf(to);
        return toIdx > fromIdx ? 'left' : 'right';
    };

    let content = null;
    if (selectedNav === 'que-es') content = <QueEsPawsy />;
    else if (selectedNav === 'por-que') content = <PorQuePawsy />;
    else if (selectedNav === 'lugares') content = <Lugares />;

    // Maneja el cambio de sección con transición
    const [fadeKey, setFadeKey] = React.useState(selectedNav);
    const [fadeDir, setFadeDir] = React.useState('left');
    React.useEffect(() => {
        if (selectedNav !== prevNav) {
            setFadeDir(getDirection(prevNav, selectedNav));
            setFadeKey(selectedNav);
            setPrevNav(selectedNav);
        }
    }, [selectedNav, prevNav]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>
                <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                        letterSpacing: 1,
                    }}
                >
                    Pawsy
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                        fontWeight: 400,
                    }}
                >
                    Porque ellos también merecen un hogar de confianza cuando tú no estás.
                </Typography>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    width: '100%',
                    overflow: 'auto',
                    mt: 2,
                }}
            >
                {NAVS.map((nav) => (
                    <Box
                        key={nav.value}
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            bgcolor: selectedNav === nav.value ? 'primary.main' : 'transparent',
                            color: selectedNav === nav.value ? 'primary.contrastText' : 'text.primary',
                            fontWeight: selectedNav === nav.value ? 'bold' : 'normal',
                            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                            transition: 'background 0.2s',
                            '&:hover': {
                                bgcolor: selectedNav === nav.value ? 'primary.dark' : 'action.hover',
                            },
                        }}
                        tabIndex={0}
                        onClick={() => setSelectedNav(nav.value)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedNav(nav.value); }}
                        role="button"
                        aria-pressed={selectedNav === nav.value}
                    >
                        {nav.label}
                    </Box>
                ))}
            </Box>
            <FadeSlideTransition triggerKey={fadeKey} direction={fadeDir} duration={400}>
                <Box>
                    {content}
                    {selectedNav === 'lugares' && (
                        <PropiedadesList />
                    )}
                </Box>
            </FadeSlideTransition>
        </Box>
    );
}