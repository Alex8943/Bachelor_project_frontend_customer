import React, { useState } from 'react';
import { Grid, Box, Heading, VStack, Input, Checkbox, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/apiclient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email: formData.email, password: formData.password });

      sessionStorage.setItem('authToken', response.authToken);
      sessionStorage.setItem('userRoleName', response.user.Role.name);
      sessionStorage.setItem('userName', response.user.name);
      sessionStorage.setItem('userEmail', response.user.email);

      if (response.user.role_fk === 3) {
        setMessage("Customers can't login here");
        return;
      }

      setMessage('Login successful!');
      navigate('/protected/reviews');
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
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
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              focusBorderColor="teal.500"
            />
            <Checkbox colorScheme="teal">Remember password</Checkbox>
            <Button colorScheme="teal" width="100%" type="submit">
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
               forgot password?
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