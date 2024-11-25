import React from 'react';
import { Grid, GridItem, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/not_protected/HomePage'; 
import Login from './components/not_protected/Login';
import Signup from './components/not_protected/Signup';

function App() {
  return (
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
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </GridItem>
        </Grid>
      </Flex>
    </Router>
  );
}

export default App;
