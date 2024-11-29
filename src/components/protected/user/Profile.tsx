import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Flex,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { getLikedReviewsFromUser, dislikeAReview, deleteUser} from "../../../service/apiclient"; // Update the path as needed

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleName, setUserRoleName] = useState("");
  const [userId, setUserId] = useState(null);
  const [likedReviews, setLikedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLikedReviews, setLoadingLikedReviews] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
  const cancelRef = React.useRef();

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
          setLikedReviews(Array.isArray(reviews) ? reviews : []); // Ensure likedReviews is an array
        } catch (error) {
          console.error("Error fetching liked reviews:", error);
          setLikedReviews([]); // Fallback to an empty array on error
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

  const handleDeleteUser = async () => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
      await deleteUser(userId); // Use the state variable userId
      setIsDialogOpen(false); // Close dialog
      sessionStorage.clear(); // Clear session storage
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error deleting user:", error);
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

          {/* Delete User Button */}
          <Button colorScheme="red" size="lg" width="100%" onClick={() => setIsDialogOpen(true)}>
            Delete Account
          </Button>

          {/* Confirmation Dialog */}
          <AlertDialog
            isOpen={isDialogOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsDialogOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  We're Sorry to See You Go!
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete your account? This action cannot be undone.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

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