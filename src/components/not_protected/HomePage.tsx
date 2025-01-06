import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
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
      width="100vw"
      bgGradient="linear(to-r, teal.500, green.500)"
      margin="0"
      padding="0"
    >
        


        <VStack spacing={4}>
          <Button
            as={Link}
            to="/login"
            colorScheme="teal"
            size="lg"
            width="200px"
            _hover={{ transform: 'scale(1.05)' }}
            onClick={setAuth}
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/signup"
            colorScheme="teal"
            size="lg"
            width="200px"
            _hover={{ transform: 'scale(1.05)', bg: "whiteAlpha.300" }}
            onClick={setAuth}
          >
            Signup
          </Button>
        </VStack>
    </Box>
  );
};

export default HomePage;
