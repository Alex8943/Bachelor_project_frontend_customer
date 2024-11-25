import { HStack, Image, Spacer, Text, Box, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
import logo from "../assets/logo.webp";

const Navbar = () => {
  return (
    <HStack
      p={4}
      bg="blue.400"
      color="white"
      justifyContent="center"
      position="fixed"   
      width="100%"
      top="0"
      zIndex={10}
    >
      <Image src={logo} alt="Sheridan College Logo" boxSize="50px" />
      <Spacer />
      <Text fontSize="2xl" textAlign="center">
        World of reviews
      </Text>
      <Spacer />
      <Link to="/profile">
        <IconButton
          icon={<FaUserCircle />}
          variant="ghost"
          color="white"
          aria-label="User Profile"
          fontSize="2xl"
        />
      </Link>
    </HStack>
  );
};

export default Navbar;
