import { Stack, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit'
import ArrowForward from '@mui/icons-material/ArrowForward'
import React from 'react';
import { useUser } from '../store';

function Index(props) {

  const user = useUser(state => state.user);

  return (
    <>
      <Stack display="flex" alignItems="center" justifyContent="center" textAlign="center" mt={16}>
        <Typography variant="h3" component="h1">Trampoline Routine Tariff Tool</Typography>
        <Typography variant="subtitle1" component="h2">
          Build routines and automatically export tariffs and FIG shorthand - no coach required.
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Logged in as: {JSON.stringify(user)}
        </Typography>
        <Stack direction="row" gap={2} mt={6}>
          <Button variant="contained" endIcon={<Edit />} component={RouterLink} to="/calculator">Try it out</Button>
          <Button variant="outlined" endIcon={<ArrowForward />} component={RouterLink} to="/library">See a list of skills</Button>
        </Stack>
      </Stack>
      <Box mt={12} boxShadow={3}>
        <img src='/screenshot.jpeg' alt="Screenshot of the app" width={1788} height={1382} style={{width: '100%', height: 'auto'}} /> 
      </Box>
    </>
  );
}

export default Index;