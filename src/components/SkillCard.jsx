import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, Typography, Stack, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions, Box } from '@mui/material'

function SkillCard({id, name, description, difficulty, fig_shorthand, start_position, end_position, remove, onUpdate}) {

  const [editOpen, setEditOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const openEdit = () => setEditOpen(true);
  const openRemove = () => setRemoveOpen(true);
  const closeEdit = () => setEditOpen(false);
  const closeRemove = () => setRemoveOpen(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      start_position,
      end_position,
      name,
      description,
      difficulty,
      fig_shorthand
    }
  })
  const onSubmit = (data) => {
    console.log(data)
    fetch('/api/skill', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, ...data})
    }).then(res => res.json())
      .then(res => {console.log(res); onUpdate()})
    closeEdit()
  };

  const removeSkill = () => {
    fetch('/api/skill', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
    .then(res => onUpdate())
  }

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">{name}</Typography>
        <Typography variant="body" color="text.secondary">{description}</Typography>
        <Stack mt={1}>
          <Typography variant="subtitle">Difficulty (Tariff): {difficulty}</Typography>
          <Typography variant="subtitle">FIG Shorthand: {fig_shorthand}</Typography>
          <Typography variant="subtitle">Starting position: {start_position}</Typography>
          <Typography variant="subtitle">Ending position: {end_position}</Typography>
        </Stack>
      </CardContent>
      {remove && <CardActions>
        <Button size="small" onClick={openEdit}>Edit</Button>
        <Button size="small" onClick={openRemove}>Remove</Button>
      </CardActions>}
    </Card>

    <Dialog onClose={closeEdit} open={editOpen}>
      <DialogTitle>Edit {name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2} mt={2}>
            <TextField label="Skill Name" inputProps={register("name", {required: true, maxLength: 64})} />
            <TextField label="Description" inputProps={register("description", {required: true})} />
            <TextField label="Difficulty" inputProps={register("difficulty", {required: true})} />
            <TextField label="FIG Shorthand" inputProps={register("fig_shorthand", {required: false, maxLength: 16})} />
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
              <Button type="submit" variant="contained">Save Changes</Button>
            </Box>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>

    <Dialog onClose={closeRemove} open={removeOpen}>
      <DialogTitle>Remove {name}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove {name}?  This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeRemove} color="error">Cancel</Button>
        <Button onClick={() => { closeRemove(); removeSkill() }} color="success">Yes</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default SkillCard;