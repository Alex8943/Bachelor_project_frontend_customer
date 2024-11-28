import React from 'react';
import { Box, VStack, Heading, Text, Link, Icon, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi";
import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useState } from 'react';


const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState('');
    

  const authToken = sessionStorage.getItem('authToken'); // or localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/'); // Redirect to login page if token is missing
    }

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        const storedName = sessionStorage.getItem('userName');
        if (!authToken) {
            navigate('/'); // Redirect to login if no auth token
            return;
        }
        setUserName(storedName || 'Guest');
    }, []);


  return (
    <>
      {/* Burger Menu Button */}
      <IconButton
        aria-label="Open Menu"
        icon={<FiMenu />}
        size="lg"
        position="fixed"
        top={5}
        right={100}
        zIndex={10}
        onClick={onOpen}
        color="black"
        bg="fade"
        _hover={{ bg: "green.200" }}
      />

      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box
            w="250px"
            bg="teal.600"
            color="black"
            minH="100vh"
            p={4}
          >
            <VStack align="start" spacing={6}>
              <Heading size="md" mb={6}>{userName}'s dashboard</Heading>

              <Link href="/myReviews" display="flex" alignItems="center">
                <Icon as={FiUser} boxSize={5} mr={2} />
                <Text>My reviews</Text>
              </Link>

              <Link href='/reviews' display="flex" alignItems="center">
                <Icon as={FiUser} boxSize={5} mr={2} />
                <Text>Brows reviews</Text>
              </Link>

              <Link href='/settings' display="flex" alignItems="center">
                <Icon as={FiSettings} boxSize={5} mr={2} />
                <Text>Profile settings</Text>
              </Link>

              <Link href='/statestics' display="flex" alignItems="center">
                <Icon as={FiSettings} boxSize={5} mr={2} />
                <Text>Statestics</Text>
              </Link>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
