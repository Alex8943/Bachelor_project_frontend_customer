import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, Flex} from '@chakra-ui/react';
import { updateUser, getOneUser } from '../../../service/apiclient';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const authToken = sessionStorage.getItem("authToken");
      if (!authToken) {
        navigate("/");
        return;
      }

      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          const userDetails = await getOneUser(Number(userId));
          setFormData({
            name: userDetails.name || '',
            lastname: userDetails.lastname || '',
            email: userDetails.email || '',
            password: '' // Leave password blank by default
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    checkAccess();
  }, [navigate]);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem('userId'); // Assuming the user ID is stored in sessionStorage

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      await updateUser(Number(userId), formData);
      setMessage('User updated successfully!');
      setError(null);

      // Redirect to login
      sessionStorage.clear(); // Clear session storage to force re-login
      navigate("/");
    } catch (err) {
      setMessage(null);
      setError('Failed to update user. Please try again.');
      console.error('Error updating user:', err);
    }
  };  

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh" width={'100vw'}>
      <Box maxW="500px" p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" margin="0 auto" width="500px">
        <Heading as="h1" size="lg" textAlign="center" mb={30}>
          User Settings
        </Heading>

        {message && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {message}
          </Alert>
        )}

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="name">First Name</FormLabel>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastname">Last Name</FormLabel>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter a new password (if changing)"
              />
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full">
              Update Settings
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Settings;
