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
  Select,
} from "@chakra-ui/react";
import { getRangeOfReviews, getOneUser } from "../../../service/apiclient";
import { Link, useNavigate } from "react-router-dom";

const Reviews = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [allReviews, setAllReviews] = useState([]); // Store the original dataset
  const [reviews, setReviews] = useState([]); // Displayed reviews
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [filterMessage, setFilterMessage] = useState(""); // To display filter messages
  const reviewsPerPage = 25;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * reviewsPerPage;
      const reviewsData = await getRangeOfReviews(reviewsPerPage, offset);
      setAllReviews(reviewsData); // Store original dataset
      setReviews(reviewsData); // Display the same initially
      console.log("Reviews fetched pr. page: ", reviewsData);
    } catch (error) {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

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

  // Filter when selectedGenre or selectedPlatform changes
  useEffect(() => {
    let filteredReviews = [...allReviews];

    if (selectedGenre) {
      filteredReviews = filteredReviews.filter(
        (review) =>
          Array.isArray(review.Genres) &&
          review.Genres.some((genre) => genre.name === selectedGenre)
      );
    }

    if (selectedPlatform) {
      filteredReviews = filteredReviews.filter(
        (review) => review.platform_fk.toString() === selectedPlatform
      );
    }

    if (filteredReviews.length === 0) {
      setFilterMessage("No reviews match the selected filters.");
    } else if (selectedGenre) {
      setFilterMessage(`Filtering reviews for genre: ${selectedGenre}`);
    } else if (selectedPlatform) {
      setFilterMessage(`Filtering reviews for platform: ${selectedPlatform}`);
    } else {
      setFilterMessage("");
    }

    setReviews(filteredReviews);
  }, [selectedGenre, selectedPlatform, allReviews]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const truncateText = (text, length = 50) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    let filteredReviews = [...allReviews];

    if (searchTerm.trim()) {
      filteredReviews = filteredReviews.filter((review) =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setReviews(filteredReviews);
    setCurrentPage(1);

    if (filteredReviews.length === 0) {
      setFilterMessage("No reviews match your search.");
    } else {
      setFilterMessage("");
    }
  };

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  const resetFilters = () => {
    setSelectedGenre(""); // Reset genre filter
    setSelectedPlatform(""); // Reset platform filter
    setSearchTerm(""); // Reset search term
    setFilterMessage(""); // Clear filter messages
    setCurrentPage(1); // Reset to the first page
    setReviews(allReviews); // Reset to all reviews
  };

  return (
    <Flex minHeight="100vh" direction="column" mt={90} marginRight="200px">
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" p={4}>
        <Box maxWidth="80%" width="100%" mx="auto">
          {/* Search Bar */}
          <Flex mb={4}>
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleInputChange}
              width="100%"
              focusBorderColor="teal.400"
            />
            <Button onClick={handleSearch} colorScheme="teal" ml={2}>
              Search
            </Button>
          </Flex>

          {/* Filters */}
          <Flex mb={4} justifyContent="space-between">
            <Box width="48%">
              <Select
                placeholder="Filter by genre"
                onChange={handleGenreChange}
                value={selectedGenre}
              >
                {Array.from(
                  new Set(
                    allReviews.flatMap((review) =>
                      Array.isArray(review.Genres)
                        ? review.Genres.map((genre) => genre.name)
                        : []
                    )
                  )
                ).map((genreName, index) => (
                  <option key={index} value={genreName}>
                    {genreName}
                  </option>
                ))}
              </Select>
            </Box>
            <Box width="48%">
              <Select
                placeholder="Filter by platform"
                onChange={handlePlatformChange}
                value={selectedPlatform}
              >
                {Array.from(new Set(allReviews.map((review) => review.platform_fk))).map(
                  (platform, index) => (
                    <option key={index} value={platform}>
                      Platform {platform}
                    </option>
                  )
                )}
              </Select>
            </Box>
          </Flex>

          {/* Filter Message */}
          {filterMessage && (
            <Text mb={4} color="blue.500" fontWeight="bold" textAlign="center">
              {filterMessage}
            </Text>
          )}

          {/* Delete Filter Button */}
          <Flex justifyContent="flex-end" mb={4}>
            <Button onClick={resetFilters} colorScheme="red">
              Delete Filters
            </Button>
          </Flex>

          {/* Table or Spinner */}
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
                <Button
                  onClick={goToPreviousPage}
                  isDisabled={currentPage === 1}
                  colorScheme="teal"
                  mr={4}
                >
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
