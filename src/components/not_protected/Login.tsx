import React, { useState } from 'react';
import { Grid, Box, Heading, VStack, Input, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/apiclient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty email or password fields
    if (!formData.email || !formData.password) {
      navigate('/');  // Redirect to home if fields are empty
      return;
    }

    setIsLoading(true); 
    setMessage(''); 
  
    try {
      const response = await login({ email: formData.email, password: formData.password });
  
      if (response.user.isBlocked) {
        setMessage('No email or password with these credentials.');
        setIsLoading(false); 
        return;
      }
  
      if (response.user.role_fk === 1 || response.user.role_fk === 2) {
        setMessage("Admins and Super-admins can't log in here.");
        setIsLoading(false); 
        sessionStorage.clear(); 
        return;
      }
  
      sessionStorage.setItem('userId', response.user.id); 
      sessionStorage.setItem('authToken', response.authToken);
      sessionStorage.setItem('userRoleName', response.user.Role.name); 
      sessionStorage.setItem('userName', response.user.name);
      sessionStorage.setItem('userEmail', response.user.email);

  
      setMessage('Login successful!');
      navigate('/profile'); 
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Grid
      minHeight="100vh"
      templateColumns="1fr"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      bgGradient="linear(to-r, teal.500, green.500)"
      color="white"
    >
      <Box
        width="100%"
        maxW="400px"
        p={8}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        color="gray.800"
        textAlign="center"
        alignItems={'center'}
        margin="0 auto"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" color="teal.500">
              Welcome Back!
            </Heading>
            <Input
              placeholder="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              focusBorderColor="teal.500"
              isRequired
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              focusBorderColor="teal.500"
              isRequired
            />
            <Button
              colorScheme="teal"
              width="100%"
              type="submit"
              isLoading={isLoading}
            >
              LOGIN
            </Button>
            {message && (
              <Text
                textAlign="center"
                color={message.includes('successful') ? 'green.500' : 'red.500'}
              >
                {message}
              </Text>
            )}
            <Text fontSize="sm" color="black">
              Forgot password?
            </Text>
            <Text fontSize="sm" color="teal.500">
              <Link to="/signup">Sign Up</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Grid>
  );
};

export default Login;
