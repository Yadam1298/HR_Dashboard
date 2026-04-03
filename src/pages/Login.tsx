// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Input, Button } from '@luxis-ui/react';
import { UserIcon, LockIcon } from '../assets/Icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Store username in localStorage
    localStorage.setItem('username', username);

    // Navigate to Home page
    navigate('/home');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100vh"
    >
      {/* Left Side - Branding */}
      <Box
        bg="#F13E93"
        h="100vh"
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={6}
        textAlign="center"
      >
        <Avatar
          alt="HR Dashboard Logo"
          fallback="JD"
          shape="circular"
          size="xl"
          src="https://cdn.vectorstock.com/i/500p/77/14/hr-people-search-logo-vector-7437714.jpg"
          style={{ height: '150px', width: '150px' }}
        />
        <h1 fontSize="2xl" fontWeight={600} mt={4}>
          Welcome to HR Dashboard
        </h1>
        <h1 mt={2} fontSize="md">
          Login to view the professional dashboard
        </h1>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        bg="#f9f9f9"
        h="100vh"
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          w="100%"
          maxW="400px"
        >
          <h1 fontSize="lg" fontWeight={600} mb={2}>
            Login
          </h1>

          <Input
            label="Username"
            placeholder="Enter username"
            leftIcon={<UserIcon />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            placeholder="Enter password"
            leftIcon={<LockIcon />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            onClick={handleLogin}
            variant="solid"
            colorScheme="pink"
            mt={4}
          >
            Login
          </Button>

          <h1 fontSize="sm" color="#737373" h1Align="center" mt={2}>
            Forgot your password?{' '}
            <a href="#" style={{ color: '#F13E93' }}>
              Reset
            </a>
          </h1>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
