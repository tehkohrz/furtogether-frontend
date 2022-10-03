import React from 'react';
import { Flex, Stack, Box, useColorModeValue, Heading, Text, Tabs } from '@chakra-ui/react'
import { TabsComponent } from '../'


const PhotoAlbum = () => {



return (
  <>
  
  <Flex minH={'100vh'} align={'stretch'} justify={'flex-start'} bg={useColorModeValue('teal.100', 'teal.600')} direction={'column'}>
    <Box rounded={'lg'} bg={useColorModeValue('cyan.500', 'teal.800')} boxShadow={'lg'} p={8}>
      
    <TabsComponent/>
      
    </Box>
  </Flex>
  </>
)

}

export default PhotoAlbum