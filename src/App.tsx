import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Grid, GridItem, Flex} from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'

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
              {/* Routes go here */}
              <Route> </Route>
            </Routes>
          </GridItem>
          
        
        </Grid>

      </Flex>
    </Router>
  )
}

export default App
