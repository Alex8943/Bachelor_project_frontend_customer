import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Input, Button, Text, VStack, Select } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, getRoles } from '../../service/apiclient';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    role_fk: '', // Initially empty; will be set to "Customer" role ID later
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        console.log('Fetched Roles:', rolesData); // Log roles to confirm
        setRoles(rolesData);

        // Automatically set the default "Customer" role ID
        const customerRole = rolesData.find((role) => role.name === 'Customer');
        if (customerRole) {
          setFormData((prev) => ({ ...prev, role_fk: customerRole.id }));
        }

      
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        name: formData.name,
        lastname: formData.lastName,
        role_fk: formData.role_fk, // Send the role_fk in the signup request
        email: formData.email,
        password: formData.password,
      });
      setMessage('Signup successful!');

      // Store token in local storage if provided
      localStorage.setItem('authToken', response.token);

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error) {
      setMessage('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <Grid
      minHeight="100vh"
      templateColumns="1fr"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500, green.500)" // Matches the website's theme
      width={'100vw'}
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
        margin={'0 auto'} // Center the box
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" color="teal.500">
              Sign Up
            </Heading>
            <Input
              placeholder="First Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              focusBorderColor="teal.500"
            />
            <Input
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              focusBorderColor="teal.500"
            />
            <Input
              placeholder="Email Address"
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
            <Button colorScheme="teal" width="100%" type="submit">
              SIGN UP
            </Button>
            {message && (
              <Text
                textAlign="center"
                color={message.includes('successful') ? 'green.500' : 'red.500'}
              >
                {message}
              </Text>
            )}
            <Text fontSize="sm" color="teal.500">
              <Link to="/login">Already have an account? Go back</Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Grid>
  );
}

export default SignUp;
