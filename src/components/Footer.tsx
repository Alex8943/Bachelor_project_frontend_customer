import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, teal.500, green.500)"
      color="white"
      textAlign="center"
      py={4}
      position="relative"
      width="100%"
      marginTop="auto"
    >
      <Text fontSize="sm">&copy; 2025 World of Podcast Reviews. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
