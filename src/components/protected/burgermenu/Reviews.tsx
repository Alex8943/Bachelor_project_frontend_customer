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
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 25; // Set to match the backend limit
  const navigate = useNavigate();

  // Check access on mount
  useEffect(() => {
    const checkAccess = async () => {
      if (!authToken) {
        navigate("/");
      }
    };
    checkAccess();
  }, [navigate]);

  // Fetch reviews for the current page
  const fetchReviews = async (page) => {
    try {
      setLoading(true);
      const offset = (page - 1) * reviewsPerPage;
      const reviewsData = await getRangeOfReviews(reviewsPerPage, offset); // Updated to fetch based on offset
      setReviews(reviewsData);
      setFilteredReviews(reviewsData); // Reset the filtered reviews
      console.log("Amount of reviews fetched from the backend: ", reviewsData.length);
    } catch (error) {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage); // Fetch reviews whenever the page changes
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
    filteredReviews.forEach((review) => {
      if (!users[review.user_fk]) {
        fetchUserDetails(review.user_fk);
      }
    });
  }, [filteredReviews]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredReviews(reviews);
      setCurrentPage(1);
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
                    {filteredReviews.map((review) => (
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
                <Button onClick={goToNextPage} isDisabled={filteredReviews.length < reviewsPerPage} colorScheme="teal">
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

