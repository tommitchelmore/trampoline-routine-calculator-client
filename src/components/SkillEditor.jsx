import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, FormLabel, Button, Backdrop, CircularProgress, Box } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function SkillEditor(props) {

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      start_position: 'feet',
      end_position: 'feet'
    }
  })

  const onSubmit = (data) => {
    setLoading(true)
    fetch('/api/skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {props.onUpdate();setLoading(false)})
  }

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField label="Skill Name*" inputProps={register("name", {required: true, maxLength: 64})} error={errors.hasOwnProperty('name')} />
          <TextField label="Description*" inputProps={register("description", {required: true})} error={errors.hasOwnProperty('description')} />
          <TextField label="Difficulty*" inputProps={register("difficulty", {required: true})} error={errors.hasOwnProperty('difficulty')} />
          <TextField label="FIG Shorthand*" inputProps={register("fig_shorthand", {required: true, maxLength: 16})} error={errors.hasOwnProperty('fig_shorthand')} />
          <FormControl component="fieldset">
              <FormLabel component="legend">Starting position</FormLabel>
              <Controller
                control={control}
                name="start_position"
                rules={{required: true}}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="feet" control={<Radio />} label="Feet" />
                    <FormControlLabel value="seat" control={<Radio />} label="Seat" />
                    <FormControlLabel value="back" control={<Radio />} label="Back" />
                    <FormControlLabel value="front" control={<Radio />} label="Front" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Ending position</FormLabel>
              <Controller
                control={control}
                name="end_position"
                rules={{required: true}}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="feet" control={<Radio />} label="Feet" />
                    <FormControlLabel value="seat" control={<Radio />} label="Seat" />
                    <FormControlLabel value="back" control={<Radio />} label="Back" />
                    <FormControlLabel value="front" control={<Radio />} label="Front" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Box>
              <Button type="submit" variant="contained">Submit</Button>
            </Box>
        </Stack>
      </form>
    </>
  );
}

export default SkillEditor;