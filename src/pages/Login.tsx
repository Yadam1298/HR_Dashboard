import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Input, Button, Typography } from '@luxis-ui/react';
import { UserIcon, LockIcon } from '../assets/Icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('username', username);
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
          size="lg"
          src="https://cdn.vectorstock.com/i/500p/77/14/hr-people-search-logo-vector-7437714.jpg"
          style={{ height: '150px', width: '150px' }}
        />
        <Typography variant="h5" weight="bold" style={{ marginBottom: '2' }}>
          Welcome to HR Dashboard
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '2' }}>
          Login to view the professional dashboard
        </Typography>
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
          <Typography variant="h4" weight="bold">
            Login
          </Typography>

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

          <Button onClick={handleLogin} variant="primary">
            Login
          </Button>

          <Typography
            variant="body2"
            color="muted"
            style={{ textAlign: 'center' }}
          >
            Forgot your password?{' '}
            <a href="#" style={{ color: '#F13E93' }}>
              Reset
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
