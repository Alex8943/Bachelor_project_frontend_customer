import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { getAllReviewsByUser } from "../../../service/apiclient";
import { navigate } from "@reach/router";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        console.log("Fetched userId from sessionStorage:", userId); // Debug
        if (!userId) {
          throw new Error("User ID not found in sessionStorage");
        }
  
        const reviews = await getAllReviewsByUser(userId);
        setReviews(reviews);
        setLoading(false);
        console.log("Users id: ", userId);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load user reviews.");
        setLoading(false);
  
        // Redirect to login if no userId
        navigate("/login");
      }
    };
  
    fetchUserReviews();
  }, []);  
  

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        marginRight="400px"
      >
        <Alert
          status="error"
          maxW="400px"
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }
  

  return (
    <Flex direction="column" align="center" minHeight="100vh" p={8}>
      <Box
        width="100%"
        maxW="800px"
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
      >
        <Heading as="h1" size="lg" mb={6} color="teal.600" textAlign="center">
          My Reviews
        </Heading>
        {reviews.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {reviews.map((review) => (
              <Box
                key={review.id}
                p={4}
                boxShadow="md"
                borderRadius="md"
                bg="gray.50"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {review.title}
                </Text>
                <Text>{review.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  <strong>Created:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text>No reviews available.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MyReviews;
