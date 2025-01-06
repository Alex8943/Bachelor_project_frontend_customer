import React from 'react';
import { Grid, GridItem, Flex, Box} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Ensure the path to AuthContext is correct
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import HomePage from './components/not_protected/HomePage';
import Login from './components/not_protected/Login';
import Signup from './components/not_protected/Signup';
import Profile from './components/protected/user/Profile';
import ProtectedRoute from './components/IsProtected';
import MyReviews from './components/protected/burgermenu/MyReviews';
import Reviews from './components/protected/burgermenu/Reviews';
import Settings from './components/protected/burgermenu/Settings';
import ReviewDetails from './components/protected/burgermenu/ReviewDetails';
import Statestics from './components/protected/burgermenu/Statestics';
import CreateReview from './components/protected/burgermenu/CreateReview'
import UpdateReview from './components/protected/burgermenu/UpdateReview';
import Policies from './components/Policies';


function App() {
  
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Flex direction="column" minHeight="100vh">
          <Grid
            templateAreas={{
              base: `"nav" "main"`,
              lg: `"nav nav" "aside main"`,
            }}
          >
            <GridItem gridArea="nav">
              <Navbar />
            </GridItem>

            <GridItem gridArea="main" bgColor="linear(to-r, teal.500, green.500)">
              <Routes>
                {/* It should be a public route */}
                <Route path="/" element={<HomePage />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/policies" element={<Policies />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/myReviews" element={<MyReviews />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/getReview/:id" element={<ReviewDetails />} />
                  <Route path="/statestics" element={<Statestics />} />
                  <Route path="/createReview" element={<CreateReview />} />
                  <Route path="/update/review/:id" element={<UpdateReview />} />
                </Route>
                  
              </Routes>
            </GridItem>
          </Grid>
          <Box as="footer" width="100%">
            <Footer />
          </Box>
        </Flex>
      </Router>
    </AuthProvider>
  );
}

export default App;
