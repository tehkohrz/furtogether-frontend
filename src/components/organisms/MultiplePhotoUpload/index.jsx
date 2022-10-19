import React, { useEffect, useState } from 'react'
import { supabase } from '../../../services/supabaseClient'
import { Box, Flex, useColorModeValue, Stack, HStack, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'
import { MultipleFileUpload } from '../../atoms'
import { ImageViewer, ChakraCheckBox, SimpleSideBar } from '../../molecules'
import { Avatar } from '../../organisms'
import { photoAlbumAPI } from '../../../api/photoalbum-api' 

const MultiplePhotoUpload = ({ size, data }) => {
  const [arrayOfUrl, setArrayOfUrl] = useState([])
  const [animalUrl, setAnimalUrl] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dogUpload, setDogUpload] = useState("")


  useEffect(() => {
    const fetchImage = async () => {
      const getPhotoAlbum = await photoAlbumAPI.retrievePhotoAlbum()
      const data = getPhotoAlbum['data']
      
      const urlContainer = []
      for (const index in data) {
        const object = data[index]
        const url = object['url']
        urlContainer.push(url)  
      }
      
      setArrayOfUrl(urlContainer)
      downloadImage(urlContainer)
      console.log('Fetching multiple image')
    }

    fetchImage()
    
  }, [uploading])
  
  const onUpload = (url) => {
    downloadImage(url)
  }

  const downloadImage = async (patharray) => {
    try {
      const arrayUpload = []
      // console.log('this is the path')
      // console.log(patharray)
      for (const index in patharray) {
        const path = patharray[index]
        const { data, error } = await supabase.storage
          .from('animalphotos')
          .download(path)
        if (error) {
          throw error
        }
      const url = URL.createObjectURL(data)
      arrayUpload.push(url)
      // console.log(url)
      // console.log(animalUrl)
      }
    setAnimalUrl(arrayUpload)

    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadImages = async (event) => {
    console.log('Uploading Images....')
    try {
    
    const curFiles = event.target.files
    const listOfFileName = []
    // console.log(curFiles)
    for (const [key, file] of Object.entries(curFiles)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // save filepath to database here.
      console.log(filePath)

      let { error: uploadError } = await supabase.storage
        .from('animalphotos')
        .upload(filePath, file)
      listOfFileName.push(filePath)
      console.log('Successful upload')
      
      if (uploadError) {
        throw uploadError
      }
    }
    //

    const response = await photoAlbumAPI.uploadPhotoAlbum({listOfFileName,dogUpload})
    console.log(response)

    setUploading(!uploading)
    
    } catch (error) {
      console.error(error)
    }
  }

  const eventHandler= (event) => {
    console.log('hiiiii this is event')
    console.log(event)
    setDogUpload(event)
  }


  return (
    <Flex direction='column'>
      <HStack bg={useColorModeValue('cyan.500', 'teal.800')} p='2' mt='2' align={'center'} justify={'space-around'}> 
        <Box>
          <Avatar/>
        </Box>
        <HStack>
          <Box>
           <Stat px='6' py='2' border={'1px solid'} borderColor={useColorModeValue('gray.500', 'gray.500')}>
              {/* <StatLabel> Photos </StatLabel> */}
              <StatNumber> 500 </StatNumber>
              <StatHelpText> Photos</StatHelpText>
           </Stat>
          </Box>
          <Box>
              <Stat px='6' py='2' border={'1px solid'} borderColor={useColorModeValue('gray.500', 'gray.500')}>
              {/* <StatLabel> Photos </StatLabel> */}
              <StatNumber> 1 </StatNumber>
              <StatHelpText> Dog </StatHelpText>
           </Stat>
          </Box>
        </HStack>
        <Stack>
          <Box>
            <ChakraCheckBox eventHandler ={eventHandler} data={data}/>
          </Box>
          <Box>
            <MultipleFileUpload handleChange={uploadImages}/>
          </Box>
        </Stack>
      </HStack>
      <Stack>
        <Box>
        <SimpleSideBar/>
        </Box>
        <Box border={'1px solid'} direction='column'>
          {arrayOfUrl ? <ImageViewer imageArray={animalUrl ? animalUrl : `https://via.placeholder.com/150`}/> : null}
        </Box>
      </Stack>
    </Flex>
  )
}

export default MultiplePhotoUpload