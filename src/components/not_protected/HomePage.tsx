import React, { useContext} from 'react';
import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const setAuth = () => {
    sessionStorage.setItem('authToken', 'mock_auth_token');
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw" // Ensure it fills the full width of the viewport
      bgGradient="linear(to-r, teal.500, green.500)"
      color="green.50" 
      margin="0" // Remove any margin
      padding="0" // Remove any padding
    >
      <VStack spacing={6}>
        <Heading textAlign="center">
          Welcome! Only a step away from a world of podcast reviews!
        </Heading>
        {/* Buttons for Login and Signup */}
        <Button
          as={Link}
          to="/login"
          colorScheme="teal"
          size="lg"
          variant="solid"
          onClick={setAuth}
        >
          Login
        </Button>
        <Button
          as={Link}
          to="/signup"
          colorScheme="teal"
          size="lg"
          variant="solid"
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={setAuth}
        >
          Signup
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
