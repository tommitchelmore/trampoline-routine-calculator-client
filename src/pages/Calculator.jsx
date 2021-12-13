import { Box, Typography } from '@mui/material';
import React from 'react';
import Calculator from '../components/Calculator';

function CalculatorPage(props) {
  return (
    <>
      <Box>
        <Typography variant="h3" component="h1">
          Calculator
        </Typography>
        <Typography variant="subtitle1" component="span">
          Design your routine here
        </Typography>
      </Box>
      <Calculator />
    </>
  );
}

export default CalculatorPage;