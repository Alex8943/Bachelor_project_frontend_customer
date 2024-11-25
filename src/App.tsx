import React from 'react';
import { Grid, GridItem, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/not_protected/homePage'; // Importing the homePage component

function App() {
  return (
    <Router>
      <Flex>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
        >
          <GridItem gridArea="nav">
            <Navbar />
          </GridItem>
          <GridItem gridArea="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </GridItem>
        </Grid>
      </Flex>
    </Router>
  );
}

export default App;
