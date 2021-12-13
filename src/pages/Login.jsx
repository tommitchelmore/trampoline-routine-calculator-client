import { Avatar, Container, TextField, Typography, Box, Stack, Button, Grid, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useUser } from '../store';

function Login(props) {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const setUser = useUser(state => state.login)
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(null)

  const onSubmit = (data) => {
    console.log(data)
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (!res.user) return setLoginError(res.message)
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
        <Typography variant={'h3'} element={'h1'} mb={4}>
          Sign In
        </Typography>
        <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
          <Stack maxWidth gap={2}>
            <TextField label={'Email Address'} inputProps={register("email", { required: true })} error={errors.hasOwnProperty('email')} helperText={errors.email && 'Email is required'} />
            <TextField label={'Password'} type="password" inputProps={register("password", { required: true })} error={errors.hasOwnProperty('password')} helperText={errors.password && 'Password is required'} />
            <Typography variant={'body2'} color={'error'}>{loginError}</Typography>
            <Button variant={'contained'} type={'submit'}>Sign in</Button>
          </Stack>
        </form>
        <Grid container mt={4}>
          <Grid item xs={6}>
            <Link to={'/forgotPassword'} component={RouterLink}>Forgot password</Link>
          </Grid>
          <Grid item xs={6} textAlign={'right'}>
            <Link to={'/signup'} component={RouterLink}>Sign up for an account</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;