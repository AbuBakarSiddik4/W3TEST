import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Box, Container } from '@mui/material';

import { AuthProvider } from './contexts/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const gcid = import.meta.env.VITE_GOOGLE;
  // console.log("GOOGLE ID : ",gcid)
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={gcid}>
        <Container >
          <Box sx={{
            minHeight: '88vh',
          }}>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Box>
          <Footer />
        </Container>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}

export default App;
