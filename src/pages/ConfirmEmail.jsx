import { Avatar, Container, TextField, Typography, Box, Stack, Button, Grid, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useUser } from '../store';

function ConfirmEmail(props) {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const setUser = useUser(state => state.login)
  const navigate = useNavigate()
  const [codeError, setCodeError] = useState(null)

  const onSubmit = (data) => {
    console.log(data)
    fetch('/api/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (!res.user) return setCodeError(res.message)
      console.log(res.user)
      setUser(res.user)
      return navigate('/')
    })
  }

  return (
    <Container maxWidth={'xs'}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <LockIcon />
        </Avatar>
        <Typography variant={'h3'} element={'h1'} textAlign={'center'}>
          Confirm Email
        </Typography>
        <Typography variant={'body1'} mb={4} textAlign={'center'}>
          We've sent you an email with a confirmation code.
        </Typography>
        <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
          <Stack maxWidth gap={2}>
            <TextField label={'Code'} inputProps={register("code", { required: true })} error={errors.hasOwnProperty('code')} helperText={errors.code && 'Code is required'} />
            {codeError && <Typography variant={'body2'} color={'error'}>{codeError}</Typography>}
            <Button variant={'contained'} type={'submit'}>Confirm</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default ConfirmEmail;