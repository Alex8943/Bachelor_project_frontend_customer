import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { getRangeOfReviews, getOneUser } from "../../../service/apiclient";
import { Link, useNavigate } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 25;

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const authToken = sessionStorage.getItem("authToken");
      if (!authToken) {
        navigate("/");
        return;
      }
    };
    checkAccess();
  }, [navigate]);

  const fetchReviews = async (page) => {
    try {
      setLoading(true);
      const startIndex = (page - 1) * reviewsPerPage;
      const data = await getRangeOfReviews(startIndex + reviewsPerPage);
      setReviews(data.slice(startIndex, startIndex + reviewsPerPage));
      setLoading(false);
    } catch (error) {
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);


  const fetchUserDetails = async (userId) => {
    if (!users[userId]) {
      try {
        console.log("Fetching details for user ID:", userId);
        const user = await getOneUser(userId); // Expecting a valid user object
        console.log("API Response for user ID", userId, ":", user);
  
        const userName = user.name || "Unknown"; // Extract name
        setUsers((prevUsers) => ({ ...prevUsers, [userId]: { name: userName } }));
        console.log("User details loaded for ID:", userId, userName);
      } catch (error) {
        console.error("Failed to fetch user details for ID:", userId, error);
      }
    }
  };
  
  
    

  useEffect(() => {
    reviews.forEach((review) => {
      fetchUserDetails(review.user_fk);
    });
  }, [reviews]);

  const truncateText = (text, length = 50) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Flex minHeight="100vh" direction="column" mt={90}>
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" p={4}>
        <Box maxWidth="80%" width="100%" mx="auto" marginRight={200}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}></Flex>

          {loading ? (
            <Spinner size="xl" color="green.500" />
          ) : error ? (
            <Text color="red.500" textAlign="center">{error}</Text>
          ) : (
            <>
              <TableContainer mt={4}>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th color="teal.700">ID</Th>
                      <Th color="teal.700">Title</Th>
                      <Th color="teal.700">Content</Th>
                      <Th color="teal.700">Created by</Th>
                      <Th color="teal.700">Review updated</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {reviews.map((review) => (
                      <Tr key={review.id}>
                        <Td>{review.id}</Td>
                        <Td>
                          <Link
                            to={`/review/${review.id}`}
                            style={{ color: "teal", textDecoration: "underline" }}
                          >
                            {review.title}
                          </Link>
                        </Td>
                        <Td style={{ color: "rgba(0, 0, 0, 0.7)", whiteSpace: "nowrap" }}>
                          {truncateText(review.description, 50)}
                        </Td>
                        <Td>{users[review.user_fk]?.name || "Unknown"}</Td>
                        <Td>{new Date(review.updatedAt).toLocaleDateString()}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex justifyContent="center" mt={4}>
                <Button
                  onClick={goToPreviousPage}
                  isDisabled={currentPage === 1}
                  colorScheme="teal"
                  mr={4}
                >
                  Previous
                </Button>
                <Button
                  onClick={goToNextPage}
                  isDisabled={reviews.length < reviewsPerPage}
                  colorScheme="teal"
                >
                  Next
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default Reviews;
