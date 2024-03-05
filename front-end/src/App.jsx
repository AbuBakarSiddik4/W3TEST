import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { AuthProvider } from './contexts/Auth'
import { Box, Container } from '@mui/material';


const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App;
