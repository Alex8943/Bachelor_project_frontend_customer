import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneReview, likeAReview } from "../../../service/apiclient"; // Import the likeAReview function
import { Box, Divider, Flex, Heading, Tag, Text, Spinner, Button, Alert, AlertIcon } from "@chakra-ui/react";

const ReviewDetails = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeMessage, setLikeMessage] = useState(null);
  const [alreadyLiked, setAlreadyLiked] = useState(false); // Track if the user already liked the review

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const userId = sessionStorage.getItem("userId"); // Get the user ID from session storage
        const data = await getOneReview(Number(id)); // Fetch review by ID
        setReview(data);

        // Check if the user already liked the review
        if (data.ReviewActions?.some((action) => action.user_fk === Number(userId) && action.review_gesture)) {
          setAlreadyLiked(true);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load review details");
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [id]);

  const handleLike = async () => {
    try {
      const userId = sessionStorage.getItem("userId"); // Assuming you store the user ID in session storage
      if (!userId) {
        setLikeMessage({ type: "error", text: "You need to log in to like a review." });
        return;
      }
      const response = await likeAReview(Number(userId), Number(id)); // Call the likeAReview function
      setLikeMessage({ type: "success", text: response });
      setAlreadyLiked(true); // Disable the button after liking
    } catch (err) {
      console.error("Error liking review:", err);
      setLikeMessage({ type: "error", text: "Failed to like the review." });
    }
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500" textAlign="center">{error}</Text>;
  }

  return (
    <Box bg="teal.50" minHeight="100vh" p={6} width="100vw">
      <Box
        maxWidth="800px"
        mx="auto"
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="0 auto"
        marginTop="100px"
      >
        {/* Title Section */}
        <Heading as="h1" size="2xl" mb={4} color="teal.700" textAlign="center">
          {review.title}
        </Heading>

        {/* Description Section */}
        <Text fontSize="lg" color="gray.700" mb={6} textAlign="justify">
          {review.description}
        </Text>

        {/* Like Button */}
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleLike}
          mt={4}
          isDisabled={alreadyLiked} // Disable the button if already liked
        >
          {alreadyLiked ? "Already Liked" : "Like Review"}
        </Button>

        {/* Like Response Message */}
        {likeMessage && (
          <Alert status={likeMessage.type} mt={4}>
            <AlertIcon />
            {likeMessage.text}
          </Alert>
        )}
      </Box>

      <Divider my={6} />

      <Box
        maxWidth="800px"
        mx="auto"
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        {/* Genres Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} color="teal.600" textAlign="center">
            Genres
          </Heading>
          <Flex
            gap={3}
            mb={6}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {review.Genres?.map((genre) => (
              <Tag key={genre.id} colorScheme="teal" fontSize="md" p={2}>
                {genre.name}
              </Tag>
            ))}
          </Flex>
        </Box>

        <Divider my={6} />

        {/* Creator and Update Info */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500" mb={1}>
            <strong>Created by:</strong> {review.User?.name || "Unknown"}
          </Text>
          <Text fontSize="sm" color="gray.500">
            <strong>Last updated:</strong> {new Date(review.updatedAt).toLocaleDateString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewDetails;
