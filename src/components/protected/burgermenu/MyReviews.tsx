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
import { getAllReviewsByUser, deleteReview } from "../../../service/apiclient";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch authToken and userId from sessionStorage
  const authToken = sessionStorage.getItem("authToken");
  const storedUserId = sessionStorage.getItem("userId");

  // Redirect to login if no authToken is found
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
    setUserId(storedUserId);
  }, [authToken, navigate, storedUserId]);

  // Fetch all reviews by the logged-in user
  const fetchReviews = async () => {
    try {
      if (!storedUserId) {
        throw new Error("User ID not found in sessionStorage");
      }
      const reviews = await getAllReviewsByUser(storedUserId);
      setReviews(reviews);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load user reviews.");
      setLoading(false);
    }
  };

  // Fetch user reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle review deletion
  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      console.log("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review.");
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  // Render error state
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

  // Render reviews list
  return (
    <Flex
      direction="column"
      align="center"
      minHeight="100vh"
      p={8}
      bg="teal.50"
      width="100vw"
      justify="flex-start"
    >
      <Box
        width="100%"
        maxW="800px"
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
        mt={40}
      >
        <Heading as="h1" size="lg" mb={6} color="teal.600" textAlign="center">
          My Reviews
        </Heading>
        <Button
          colorScheme="teal"
          size="sm"
          mb={4}
          alignSelf="flex-end"
          onClick={() => navigate("/createReview")}
        >
          Create Review
        </Button>
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
                  <strong>Created:</strong> {new Date(review.createdAt).toLocaleDateString()}
                </Text>
                <Button
                  colorScheme="teal"
                  size="sm"
                  mt={2}
                  onClick={() => navigate(`/update/review/${review.id}`)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </Button>
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
