import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <IconButton
            color="inherit"
            size="large"
            href="https://github.com/carlosreneas/pawsy_frontend"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </React.Fragment>
  );
}