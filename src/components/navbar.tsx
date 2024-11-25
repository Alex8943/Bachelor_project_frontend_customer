import { HStack, Image, Spacer, Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.webp";

const Navbar = () => {
    return (
      <HStack
        p={4}
        bg="teal.500"
        color="teal.50"
        justifyContent="center"
        position="fixed"   
        width="100%"
        top="0"
        zIndex={10}
      >
        <Image src={logo} alt="Sheridan College Logo" boxSize="50px" />
        <Spacer />
          <Text fontSize="2xl" textAlign="center">
            world of podcast reviews
          </Text>
        <Spacer />
        
      </HStack>
    );
  };

export default Navbar;
