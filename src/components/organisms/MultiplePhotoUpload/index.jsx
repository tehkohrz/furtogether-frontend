import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { Box, Image, Input, Flex } from '@chakra-ui/react'
import { MultipleFileUpload } from '../../atoms'
import { ImageViewer } from '../../molecules'

const MultiplePhotoUpload = ({ size }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [animalUrl, setAnimalUrl] = useState([])
  const [uploading, setUploading] = useState(false)

  const arrayOfUrl = ['0.0033188937015726783.jpg','0.02363837650151379.jpg','0.11290762882225369.jpg','0.29053464275032814.jpg','0.3101771156671216.jpg']
  let url;

  useEffect(() => {
    if (arrayOfUrl) {
      downloadImage(arrayOfUrl)

    }
  }, [uploading])

  const onUpload = (url) => {
    downloadImage(url)
  }

  const downloadImage = async (patharray) => {
    try {
      const arrayUpload = []
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
      console.log(url)
      // console.log(animalUrl)
      }
    setAnimalUrl([...animalUrl, ...arrayUpload])

    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // save filepath to database here.
      console.log(filePath)

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const uploadImages = async (event) => {
    console.log('lol')
    try {

    const curFiles = event.target.files

    // console.log(curFiles)
    for (const [key, file] of Object.entries(curFiles)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      console.log(filePath)

      // let { error: uploadError } = await supabase.storage
      //   .from('animalphotos')
      //   .upload(filePath, file)

      console.log('Successful upload')
      
      // if (uploadError) {
      //   throw uploadError
      // }
    }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Flex direction='column'>

      <Box>
        <label className="button primary block" htmlFor="multiple">
        Upload photos
      </label>
      <MultipleFileUpload handleChange={uploadImages}/>
      </Box>
      <Box>
        <ImageViewer imageArray={animalUrl ? animalUrl : `https://via.placeholder.com/150`}/>
      </Box>
    </Flex>
  )
}

export default MultiplePhotoUpload