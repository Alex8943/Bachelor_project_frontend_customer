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
    <Box bg="teal.50" minHeight="100vh" p={6} display="flex" justifyContent="center" alignItems="center" width="100vw">
      <Box
        maxWidth="800px"
        width="100%"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={"100px"}
      >
        {/* Title Section */}
        <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
          User Settings
        </Heading>
  
        {/* Alerts for success or error */}
        {message && (
          <Alert status="success" mb={4} w="100%">
            <AlertIcon />
            {message}
          </Alert>
        )}
  
        {error && (
          <Alert status="error" mb={4} w="100%">
            <AlertIcon />
            {error}
          </Alert>
        )}
  
        {/* Form Section */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel htmlFor="name" color="teal.600">
                First Name
              </FormLabel>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                focusBorderColor="teal.400"
              />
            </FormControl>
  
            <FormControl>
              <FormLabel htmlFor="lastname" color="teal.600">
                Last Name
              </FormLabel>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                focusBorderColor="teal.400"
              />
            </FormControl>
  
            <FormControl>
              <FormLabel htmlFor="email" color="teal.600">
                Email
              </FormLabel>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                focusBorderColor="teal.400"
              />
            </FormControl>
  
            <FormControl>
              <FormLabel htmlFor="password" color="teal.600">
                Password
              </FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter a new password (if changing)"
                focusBorderColor="teal.400"
              />
            </FormControl>
  
            {/* Submit Button */}
            <Button colorScheme="teal" type="submit" width="100%" size="lg">
              Update Settings
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );  
}  
export default Settings;
