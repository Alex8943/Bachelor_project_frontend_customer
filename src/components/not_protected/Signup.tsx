import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Heading, Input, Button, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, getRoles } from '../../service/apiclient';
import { AuthContext } from '../AuthContext'; // Ensure this path is correct

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const { login } = useContext(AuthContext); // Use login function from AuthContext

  /*useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        console.log('Fetched Roles:', rolesData);

        // Automatically set the default "Customer" role ID if found
        const customerRole = rolesData.find((role) => role.name.toLowerCase() === 'customer');
        if (customerRole) {
          setFormData((prev) => ({ ...prev, role_fk: customerRole.id }));
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        // Default to "Customer" role ID if fetching roles fails
        setFormData((prev) => ({ ...prev, role_fk: 3 }));
      }
    };

    fetchRoles();
  }, []);

  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    console.log('Submitting signup data:', formData);

    try {
      const response = await signup(formData);
      console.log('Backend response:', response);

      if (response.authToken) {
        // Save user data to sessionStorage
        sessionStorage.setItem('userId', response.user.id); // Save userId
        sessionStorage.setItem('authToken', response.authToken);
        sessionStorage.setItem('userRoleName', response.user.rolename); // Save role name
        sessionStorage.setItem('userName', response.user.name);
        sessionStorage.setItem('userEmail', response.user.email);

        login(response.authToken); // Store token in context
        setMessage('Signup successful!');
        console.log('Signup successful. Redirecting to profile...');
        navigate('/profile'); // Redirect after successful signup
      } else {
        setMessage('Signup failed. Token is missing in response.');
      }
    } catch (error: any) {
      console.error('Signup error:', error.response || error.message);
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Grid
      minHeight="100vh"
      templateColumns="1fr"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500, green.500)"
      width="100vw"
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
        margin="0 auto"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" color="teal.500">
              Sign Up
            </Heading>
            <Input
              placeholder="First name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              focusBorderColor="teal.500"
            />
            <Input
              placeholder="Last name"
              type="text"
              name="lastname"
              value={formData.lastname}
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
