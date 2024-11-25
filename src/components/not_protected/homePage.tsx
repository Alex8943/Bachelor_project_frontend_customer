import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, teal.500, green.500)"
      color="white"
    >
      <VStack spacing={6}>
        <Heading as="h1" size="2xl">
          Welcome to the Home Page
        </Heading>
        <Text fontSize="xl">
          This is the main landing page of your application.
        </Text>
        <Button colorScheme="teal" size="lg" onClick={() => alert('Button clicked!')}>
          Click Me
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
