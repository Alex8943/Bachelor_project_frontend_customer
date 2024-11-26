import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack, Flex, Spinner } from '@chakra-ui/react';

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRoleName, setUserRoleName] = useState(''); // Track role name
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        const storedName = sessionStorage.getItem('userName');
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedRoleName = sessionStorage.getItem('userRoleName'); // Get role name from storage

        if (!authToken) {
            navigate('/'); // Redirect to login if no auth token
            return;
        }

        setUserName(storedName || 'Guest');
        setUserEmail(storedEmail || 'Unknown');
        setUserRoleName(storedRoleName || 'Unknown'); // Set role name
        setLoading(false);
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
        <Flex 
            minHeight="100vh" 
            p={8} 
            justifyContent="center" 
            alignItems="center" 
            bgGradient="linear(to-r, teal.500, green.500)"
            width={'100vw'}
        >
            <Box
                width="100%"
                maxW="500px"
                p={8}
                boxShadow="xl"
                borderRadius="lg"
                bg="white"
                textAlign="center"
                margin="0 auto"

            >
                <Heading as="h1" size="lg" mb={6} color="teal.600">
                    User Profile
                </Heading>
                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" color="gray.700">
                        <strong>Name:</strong> {userName}
                    </Text>
                    <Text fontSize="lg" color="gray.700">
                        <strong>Email:</strong> {userEmail}
                    </Text>
                    <Text fontSize="lg" color="gray.700">
                        <strong>Role:</strong> {userRoleName}
                    </Text>
                    <Button colorScheme="teal" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Profile;
