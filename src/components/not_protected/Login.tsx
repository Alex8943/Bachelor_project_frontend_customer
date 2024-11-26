import React, { useState } from 'react';
import { Grid, Box, Heading, VStack, Input, Checkbox, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/apiclient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(''); // Clear previous messages
    try {
      const response = await login({ email: formData.email, password: formData.password });

      // Save user data to sessionStorage
      sessionStorage.setItem('authToken', response.authToken);
      sessionStorage.setItem('userId', response.user.id); // Save userId
      sessionStorage.setItem('userRoleName', response.user.roleName || 'Unknown');
      sessionStorage.setItem('userName', response.user.name);
      sessionStorage.setItem('userEmail', response.user.email);

      // Check user role
      if (response.user.role_fk === 1 || response.user.role_fk === 2) {
        setMessage("Admins and Super-admins can't log in here.");
        setIsLoading(false); // Stop loading
        sessionStorage.clear(); // Clear sessionStorage for invalid logins
        return;
      }

      setMessage('Login successful!');
      navigate('/protected/profile'); // Redirect to the profile page
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false); // Stop loading
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
            <Checkbox colorScheme="teal">Remember password</Checkbox>
            <Button
              colorScheme="teal"
              width="100%"
              type="submit"
              isLoading={isLoading} // Show loading spinner
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
