import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import {
  getAllGenres,
  getAllPlatforms,
  getAllMedias,
  updateReview,
} from '../../../service/apiclient';

const UpdateReview = () => {
  const { id } = useParams();  // Get review ID from URL params
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre_ids: [],
    media_fk: '',
    platform_fk: '',
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [medias, setMedias] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all genres, platforms, and media options
    const fetchOptions = async () => {
      try {
        const [genreList, platformList, mediaList] = await Promise.all([
          getAllGenres(),
          getAllPlatforms(),
          getAllMedias(),
        ]);
        setGenres(genreList);
        setPlatforms(platformList);
        setMedias(mediaList);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load form options.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchOptions();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedGenres);
    setFormData({ ...formData, genre_ids: updatedGenres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateReview(id, formData);  // Pass form data and review ID
      toast({
        title: 'Review Updated',
        description: 'The review has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/profile');  // Redirect to profile or dashboard
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error',
        description: 'Failed to update the review.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="teal.50" minHeight="100vh" p={6} display="flex" justifyContent="center" alignItems="center">
      <Box
        maxWidth="700px"
        width="100%"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h1" size="2xl" mb={6} color="teal.700" textAlign="center">
          Update Review
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter review title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your review here"
              />
            </FormControl>

            {/* Media Selection */}
            <FormControl isRequired>
              <FormLabel>Media</FormLabel>
              <Select
                placeholder="Select Media"
                name="media_fk"
                value={formData.media_fk}
                onChange={handleChange}
              >
                {medias.map((media) => (
                  <option key={media.id} value={media.id}>
                    {media.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Platform Selection */}
            <FormControl isRequired>
              <FormLabel>Platform</FormLabel>
              <Select
                placeholder="Select Platform"
                name="platform_fk"
                value={formData.platform_fk}
                onChange={handleChange}
              >
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.link}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Genre Selection */}
            <FormControl>
              <FormLabel>Genres</FormLabel>
              <VStack align="start">
                {genres.map((genre) => (
                  <Checkbox
                    key={genre.id}
                    isChecked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  >
                    {genre.name}
                  </Checkbox>
                ))}
              </VStack>
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="100%" isLoading={loading}>
              {loading ? <Spinner size="md" /> : 'Update Review'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateReview;
