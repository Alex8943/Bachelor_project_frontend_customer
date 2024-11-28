import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Spinner } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getTopGenres } from "../../../service/apiclient"; 
import { useNavigate } from "react-router-dom";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statestics = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);


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


  useEffect(() => {
    const fetchTopGenres = async () => {
      try {
        const data = await getTopGenres();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching top genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopGenres();
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="teal.50">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  // Prepare data for the bar chart
  const chartData = {
    labels: genres.map((genre) => genre.name),
    datasets: [
      {
        label: "Review Count",
        data: genres.map((genre) => genre.review_count > 3600000 ? 3700000 : genre.review_count),
        backgroundColor: "rgba(56, 178, 172, 0.8)", // Teal color for bars
        borderColor: "rgba(56, 178, 172, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Genres by Review Count",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Genre",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Review Count",
        },
      },
    },
  };

  return (
    <Box bg="teal.50" minHeight="100vh" p={6} width="100vw">
      <Box
        maxWidth="800px"
        mx="auto"
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        marginTop={"100px"}
      >
        <Heading as="h1" size="xl" mb={6} color="teal.700">
          Genre Statistics
        </Heading>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default Statestics;
