import React from 'react';
import { Flex, Stack, Box, useColorModeValue, Heading, Text } from '@chakra-ui/react'
const PhotoAlbum = () => {



return (
  <>
  
  <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('teal.100', 'teal.600')}>
    <Box round={'lg'} bg={useColorModeValue('cyan.500', 'teal.800')}> 
    <p> lol </p>
    </Box>
    <Box rounded={'lg'} bg={useColorModeValue('cyan.500', 'teal.800')} boxShadow={'lg'} p={8}>
      <p> lol </p>


    </Box>
  </Flex>
  </>
)

}

export default PhotoAlbum