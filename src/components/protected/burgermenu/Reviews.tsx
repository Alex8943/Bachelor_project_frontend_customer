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
  Input,
} from "@chakra-ui/react";
import { getRangeOfReviews, getOneUser } from "../../../service/apiclient";
import { Link, useNavigate } from "react-router-dom";

const Reviews = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 25; // Number of reviews to fetch per page
  const navigate = useNavigate();

  // Check access on mount
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  // Fetch reviews from the backend for the current page
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * reviewsPerPage; // Calculate offset based on the page
      const reviewsData = await getRangeOfReviews(reviewsPerPage, offset); // Fetch reviews with limit and offset
      setReviews(reviewsData);
      console.log("Reviews fetched pr. page: ", reviewsData);
    } catch (error) {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the page changes
  }, [currentPage]);

  // Fetch user details dynamically and cache them
  const fetchUserDetails = async (userId) => {
    if (!users[userId]) {
      try {
        const user = await getOneUser(userId);
        setUsers((prevUsers) => ({
          ...prevUsers,
          [userId]: user.name || "Unknown",
        }));
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };

  useEffect(() => {
    reviews.forEach((review) => {
      if (!users[review.user_fk]) {
        fetchUserDetails(review.user_fk);
      }
    });
  }, [reviews]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      fetchReviews(); // Reset reviews if search is cleared
    } else {
      const filtered = reviews.filter((review) =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setReviews(filtered);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchReviews();
    }
  };

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  const truncateText = (text, length = 50) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <Flex minHeight="100vh" direction="column" mt={90}>
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" p={4}>
        <Box maxWidth="80%" width="100%" mx="auto">
          <Flex justifyContent="center" alignItems="center" mb={4}>
            <Box width="70%">
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleInputChange}
                width="100%"
                focusBorderColor="teal.400"
              />
            </Box>
            <Button onClick={handleSearch} colorScheme="teal" ml={2}>
              Search
            </Button>
          </Flex>

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
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Content</Th>
                      <Th>Created by</Th>
                      <Th>Review updated</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {reviews.map((review) => (
                      <Tr key={review.id}>
                        <Td>{review.id}</Td>
                        <Td>
                          <Link
                            to={`/getReview/${review.id}`}
                            style={{ color: "teal", textDecoration: "underline" }}
                          >
                            {review.title}
                          </Link>
                        </Td>
                        <Td>{truncateText(review.description)}</Td>
                        <Td>{users[review.user_fk] || "Loading..."}</Td>
                        <Td>{new Date(review.updatedAt).toLocaleDateString()}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex justifyContent="center" mt={4}>
                <Button onClick={goToPreviousPage} isDisabled={currentPage === 1} colorScheme="teal" mr={4}>
                  Previous
                </Button>
                <Button onClick={goToNextPage} colorScheme="teal">
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
