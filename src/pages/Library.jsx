import { Typography } from '@mui/material';
import React from 'react';
import SkillLibrary from '../components/SkillLibrary';

function Library(props) {

  return (
    <>
      <Typography variant="h3" component="h1">
        Library
      </Typography>
      <SkillLibrary />
    </>
  );
}

export default Library;