import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import SkillEditor from '../components/SkillEditor';
import SkillLibrary from '../components/SkillLibrary';

function Admin(props) {

  const [trigger, setTrigger] = useState(0);

  const handleUpdate = () => {
    setTrigger(trigger + 1);
  }

  return (
    <>
      <Stack gap={2}>
        <Typography variant="h3" component="h1">
          Add new skill
        </Typography>
        <SkillEditor onUpdate={handleUpdate} />
      </Stack>
      <Stack gap={2}>
        <Typography variant="h3" component="h1">
          Existing Skills
        </Typography>
        <SkillLibrary updateTrigger={trigger} />
      </Stack>
    </>
  );
}

export default Admin;