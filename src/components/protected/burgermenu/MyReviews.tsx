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
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { getAllReviewsByUser, deleteReview, showAllDeletedReviews, undeleteReview } from "../../../service/apiclient";
import { Link, useNavigate } from "react-router-dom";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const userId = sessionStorage.getItem("authToken");
      if (!userId) {
        setMessage("You have to be signed in to access this page");
        navigate("/");
      }
    };
    checkAccess();
  }, [navigate]);

  const fetchReviews = async (deleted = showDeleted) => {
    try {
      const userId = sessionStorage.getItem("userId");
      console.log("Fetched userId from sessionStorage:", userId); // Debug

      if (!userId) {
        throw new Error("User ID not found in sessionStorage");
      }

      let reviews;
      if (deleted) {
        reviews = await showAllDeletedReviews();
      } else {
        reviews = await getAllReviewsByUser(userId);
      }

      setReviews(reviews);
      setLoading(false);
      setUserId(userId);
      console.log("Users id: ", userId);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load user reviews.");
      setLoading(false);

      // Redirect to login if no userId
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [navigate, showDeleted]);

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

  const handleUndelete = async (id) => {
    try {
      await undeleteReview(id);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      console.log("Review undeleted successfully");
    } catch (error) {
      console.error("Error undeleting review:", error);
      setError("Failed to undelete review.");
    }
  };

  const toggleShowDeleted = () => {
    setShowDeleted((prev) => !prev);
    setLoading(true);
    fetchReviews(!showDeleted);
  };

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
    <Flex
      direction="column"
      align="center"
      minHeight="100vh"
      p={8}
      bg="teal.50"
      width="100vw"
      justify="flex-start" // Align content to the top initially
    >
      <Box
        width="100%"
        maxW="800px"
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
        mt={40} // Use this to push the content down
      >
        <Heading as="h1" size="lg" mb={6} color="teal.600" textAlign="center">
          My Reviews
        </Heading>
        <FormControl display="flex" alignItems="center" mb={4}>
          <FormLabel htmlFor="show-deleted" mb="0">
            Show Deleted Reviews
          </FormLabel>
          <Switch id="show-deleted" isChecked={showDeleted} onChange={toggleShowDeleted} />
        </FormControl>
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
                {!showDeleted ? (
                  <Button
                    colorScheme="red"
                    size="sm"
                    mt={2}
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    colorScheme="green"
                    size="sm"
                    mt={2}
                    onClick={() => handleUndelete(review.id)}
                  >
                    Undelete
                  </Button>
                )}
              </Box>
            ))}
          </VStack>
        ) : (
          <Text>No reviews available.</Text>
        )}
      </Box>
    </Flex>
  );
}

export default MyReviews;
