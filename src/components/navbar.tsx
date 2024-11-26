import { HStack, Image, Spacer, Text, Box, Button, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.webp";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "./protected/burgermenu/Sidebar";

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
        <Sidebar />
        <Spacer />
          <Text fontSize="2xl" textAlign="center">
            world of podcast reviews
          </Text>
        <Spacer />
        <Link to="/protected/profile">
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
