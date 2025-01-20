import React, { useState, useContext } from 'react';
import { Box, Grid, Heading, Input, Button, Text, VStack, Checkbox, Link as ChakraLink, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../service/apiclient';
import { AuthContext } from '../AuthContext';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPolicyAccepted(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
  
    if (!isPolicyAccepted) {
      setIsModalOpen(true);
      return;
    }
  
    // Check if any input field is empty
    if (!formData.name || !formData.lastname || !formData.email || !formData.password) {
      setMessage('Please fill out the forms');
      return;
    }
  
    const performSignup = async () => {
      try {
        const response = await signup(formData);
  
        sessionStorage.setItem('userId', response.user.id);
        sessionStorage.setItem('authToken', response.authToken);
        sessionStorage.setItem('userRoleName', response.user.Role.name); // Updated to correctly save the role name
        sessionStorage.setItem('userName', response.user.name);
        sessionStorage.setItem('userEmail', response.user.email);
        sessionStorage.setItem('userId', response.user.id); // Assuming user.id represents the user_fk

        login(response.authToken);
        setMessage('Signup successful!');
        
        navigate('/profile');

      } catch (error: any) {
        // Show backend message or fallback message
        setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
      }
    };
  
    performSignup();
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
            <Checkbox colorScheme="teal" onChange={handlePolicyChange}>
              I agree to the{' '}
              <Link to="/policies" style={{ color: '#319795', textDecoration: 'underline' }}>
                Policies
              </Link>
            </Checkbox>
            
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

      {/* Policy Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accept Policies</ModalHeader>
          <ModalBody>
            You must agree to our policies before signing up. Please review our{' '}
            <Link to="/policies" style={{ color: '#319795', textDecoration: 'underline' }}>
                Policies
              </Link>{' '}
            for more details.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => setIsModalOpen(false)}>
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default SignUp;
