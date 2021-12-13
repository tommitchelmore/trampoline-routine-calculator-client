import React, { Suspense, useEffect } from 'react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useMemo } from 'react';
import Layout from './layouts/Default';
import { useUser } from './store';

const Home = React.lazy(() => import('./pages/index'));
const Library = React.lazy(() => import('./pages/Library'));
const Calculator = React.lazy(() => import('./pages/Calculator'));
const Routines = React.lazy(() => import('./pages/Routines'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ConfirmEmail = React.lazy(() => import('./pages/ConfirmEmail'));
const Contributor = React.lazy(() => import('./pages/Contributor'));

function App(props) {
  const user = useUser(state => state.user);
  const logout = useUser(state => state.logout);

  useEffect(() => {
    fetch('/api/me')
    .then(res => {
      if (res.status !== 200) logout()
    })
  })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/signin" element={!user ? <Login /> : <Navigate to='/'/>} />
              <Route path="/signup" element={!user ? <Register /> : <Navigate to='/'/>} />
              <Route path="/contributor" element={(user?.role === 'contributor' || user?.role === 'admin') ? <Contributor /> : <Navigate to='/'/>} />
              <Route path="/confirm-email" element={!user ? <ConfirmEmail /> : <Navigate to='/'/>} />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </ThemeProvider>
  </>
}

export default App;