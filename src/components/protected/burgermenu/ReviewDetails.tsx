import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneReview } from "../../../service/apiclient";
import { Box, Divider, Flex, Heading, Tag, Text, Spinner } from "@chakra-ui/react";

const ReviewDetails = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const data = await getOneReview(Number(id)); // Fetch review by ID
        setReview(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load review details");
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [id]);

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
    <Box bg="teal.50" minHeight="100vh" p={6} width={'100vw'}>
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
        marginTop={"100px"}
      >
        {/* Title Section */}
        <Heading as="h1" size="2xl" mb={4} color="teal.700" textAlign="center">
          {review.title}
        </Heading>
  
        {/* Description Section */}
        <Text fontSize="lg" color="gray.700" mb={6} textAlign="justify">
          {review.description}
        </Text>
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
