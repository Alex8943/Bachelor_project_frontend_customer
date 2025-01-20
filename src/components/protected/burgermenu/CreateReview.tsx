import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Spinner,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import {
  createReview,
  getAllGenres,
  getAllPlatforms,
  getAllMedias,
} from "../../../service/apiclient"; // Adjust the import path
import { useNavigate } from "react-router-dom";

const CreateReview = () => {
  const [formData, setFormData] = useState({
    media_fk: "",
    title: "",
    description: "",
    platform_fk: "",
    genre_ids: [],
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [mediaOptions, setMediaOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [userId, setUserId] = useState(null);  // Store user ID

  const toast = useToast();
  const navigate = useNavigate();

  // Fetch user ID from session storage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  // Fetch media, platforms, and genres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mediaData, platformData, genreData] = await Promise.all([
          getAllMedias(),
          getAllPlatforms(),
          getAllGenres(),
        ]);

        setMediaOptions(mediaData);
        setPlatformOptions(platformData);
        setGenreOptions(genreData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load form options.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (genreId: number) => {
    const selectedGenres = formData.genre_ids.includes(genreId)
      ? formData.genre_ids.filter((id) => id !== genreId)
      : [...formData.genre_ids, genreId];

    setFormData({ ...formData, genre_ids: selectedGenres });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Attach user ID dynamically
    const dataToSubmit = {
      ...formData,
      user_fk: userId,
    };

    console.log("Submitting data:", dataToSubmit); // Log the data before sending

    try {
      await createReview(dataToSubmit);
      toast({
        title: "Review Created",
        description: "Your review was successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        media_fk: "",
        title: "",
        description: "",
        platform_fk: "",
        genre_ids: [],
      });
      navigate("/myReviews");
    } catch (error) {
      console.error("Error creating review:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Failed to create the review.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg="teal.50" minHeight="100vh" p={6} display="flex" justifyContent="center" alignItems="center">
      <Box
        maxWidth="700px"
        width="100%"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        marginTop="100px"
      >
        <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
          Create Review
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Review Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Write your review here"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Media</FormLabel>
              <Select
                placeholder="Select Media"
                name="media_fk"
                value={formData.media_fk}
                onChange={handleChange}
              >
                {mediaOptions.map((media) => (
                  <option key={media.id} value={media.id}>
                    {media.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Platform</FormLabel>
              <Select
                placeholder="Select Platform"
                name="platform_fk"
                value={formData.platform_fk}
                onChange={handleChange}
              >
                {platformOptions.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.link}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <VStack align="start">
                <FormLabel>Genres</FormLabel>
                {genreOptions.map((genre) => (
                  <Checkbox
                    key={genre.id}
                    isChecked={formData.genre_ids.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  >
                    {genre.name}
                  </Checkbox>
                ))}
              </VStack>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              isLoading={loading}
            >
            
              {loading ? <Spinner size="md" /> : "Submit Review"}
              
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateReview;
