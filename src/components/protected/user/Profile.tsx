import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack, Flex, Spinner } from '@chakra-ui/react';

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRoleName, setUserRoleName] = useState(''); // Track role name
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        
        const authToken = sessionStorage.getItem('authToken');
        const storedName = sessionStorage.getItem('userName');
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedRoleName = sessionStorage.getItem('userRoleName'); // Get role name from storage
        const storedUserId = sessionStorage.getItem("userId");

        if (!authToken) {
            console.log('No auth token found. Redirecting to login...');
            navigate('/'); // Redirect to login if no auth token
            
            return;
        }

        setUserName(storedName || 'Guest');
        setUserEmail(storedEmail || 'Unknown');
        setUserRoleName(storedRoleName || 'Unknown'); // Set role name
        setUserId(storedUserId || 'Unknown');
        setLoading(false);
        console.log("User role name: ", storedRoleName);
        console.log("Users id: ", storedUserId);
        console.log("Users token: ", authToken);
    }, [navigate]);

    const handleSignOut = () => {
        sessionStorage.clear(); // Clear session storage
        navigate('/'); // Redirect to login page
    };

    if (loading) {
        return (
            <Flex minHeight="100vh" justifyContent="center" alignItems="center" bgGradient="linear(to-r, teal.500, green.500)">
                <Spinner size="xl" color="white" />
            </Flex>
        );
    }

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
          >
            {/* Title Section */}
            <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
              User Profile
            </Heading>
      
            {/* User Info Section */}
            <VStack spacing={6} align="stretch" width="100%">
              <Box>
                <Text fontSize="lg" color="gray.700">
                  <strong>Name:</strong> {userName || "Unknown"}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" color="gray.700">
                  <strong>Email:</strong> {userEmail || "Unknown"}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" color="gray.700">
                  <strong>Role:</strong> {userRoleName || "Unknown"}
                </Text>
              </Box>
      
              {/* Sign Out Button */}
              <Button colorScheme="teal" size="lg" width="100%" onClick={handleSignOut}>
                Sign Out
              </Button>
            </VStack>
          </Box>
        </Box>
      );
}      
export default Profile;
