import React from 'react'
import { Image, Box, Flex, SimpleGrid } from '@chakra-ui/react'

const ImageViewer = ({imageArray}) => {

  return (
    <>
    <SimpleGrid minChildWidth='120px' spacing='10px'>
    {imageArray.map((image, index)=> (
      <Box key={index} p='2'>
      <Image key={index} boxSize= "150px" src={image}/>
      </Box>
    ))
    }
    </SimpleGrid>
    
    </>
  )
}

export default ImageViewer