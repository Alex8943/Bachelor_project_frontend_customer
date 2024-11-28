import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, VStack, Flex, Spinner } from "@chakra-ui/react";
import { getLikedReviewsFromUser, dislikeAReview } from "../../../service/apiclient"; // Update the path as needed

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleName, setUserRoleName] = useState("");
  const [userId, setUserId] = useState(null);
  const [likedReviews, setLikedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLikedReviews, setLoadingLikedReviews] = useState(true);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    const storedName = sessionStorage.getItem("userName");
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedRoleName = sessionStorage.getItem("userRoleName");
    const storedUserId = sessionStorage.getItem("userId");

    if (!authToken) {
      navigate("/"); // Redirect to login if no auth token
      return;
    }

    setUserName(storedName || "Guest");
    setUserEmail(storedEmail || "Unknown");
    setUserRoleName(storedRoleName || "Unknown");
    setUserId(Number(storedUserId));
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchLikedReviews = async () => {
        try {
          const reviews = await getLikedReviewsFromUser(userId);
          setLikedReviews(reviews);
        } catch (error) {
          console.error("Error fetching liked reviews:", error);
        } finally {
          setLoadingLikedReviews(false);
        }
      };

      fetchLikedReviews();
    }
  }, [userId]);

  const handleSignOut = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Redirect to login page
  };

  const handleDislike = async (reviewId) => {
    try {
      await dislikeAReview(userId, reviewId);
      setLikedReviews((prevLikedReviews) =>
        prevLikedReviews.filter((likedReview) => likedReview.Review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error removing like from review:", error);
    }
  };

  if (loading) {
    return (
      <Flex minHeight="100vh" justifyContent="center" alignItems="center" bgGradient="linear(to-r, teal.500, green.500)">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <Box bg="teal.50" minHeight="100vh" p={6} display="flex" justifyContent="center" alignItems="center" width="100vw">
      <Box
        maxWidth="800px"
        width="100%"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="100px"
      >
        {/* Title Section */}
        <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
          User Profile
        </Heading>

        {/* User Info Section */}
        <VStack spacing={6} align="stretch" width="100%">
          <Box>
            <Text fontSize="lg" color="gray.700">
              <strong>Name:</strong> {userName || "Unknown"}
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg" color="gray.700">
              <strong>Email:</strong> {userEmail || "Unknown"}
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg" color="gray.700">
              <strong>Role:</strong> {userRoleName || "Unknown"}
            </Text>
          </Box>

          {/* Liked Reviews Section */}
          <VStack spacing={4} align="stretch" width="100%">
            <Heading as="h2" size="lg" mb={4} color="teal.600" textAlign="center">
              Liked Reviews
            </Heading>
            {loadingLikedReviews ? (
              <Flex justifyContent="center">
                <Spinner size="lg" color="teal.500" />
              </Flex>
            ) : likedReviews.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {likedReviews.map((likedReview) => (
                  <Box
                    key={likedReview.Review.id}
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Text fontSize="lg" color="teal.700" fontWeight="bold">
                      {likedReview.Review.title}
                    </Text>
                    <Button
                      mt={2}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDislike(likedReview.Review.id)}
                    >
                      Remove Like
                    </Button>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text color="gray.500" textAlign="center">
                You have not liked any reviews yet.
              </Text>
            )}
          </VStack>

          {/* Sign Out Button */}
          <Button colorScheme="teal" size="lg" width="100%" onClick={handleSignOut}>
            Sign Out
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;
