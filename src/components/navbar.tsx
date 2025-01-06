import { HStack, Image, Spacer, Text, Box, Button, IconButton, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.webp";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "./protected/burgermenu/Sidebar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = sessionStorage.getItem("authToken");

    // Hide Sidebar if no authToken and user is on /, /signup, or /login
    const isPublicPage = ["/", "/signup", "/login"].includes(location.pathname);

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
        {!isPublicPage && authToken && <Sidebar />}
        <Spacer />
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #00C2FF, #7B61FF, #FF00E5)"
          bgClip="text"
        >
          ReCast
        </Heading>
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
