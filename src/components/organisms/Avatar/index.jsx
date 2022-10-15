import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { Box, Image, Input } from '@chakra-ui/react'
import { profileApi } from '../../../api/profile-api'

const Avatar = ({ url, size }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)


  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const onUpload = (url) => {
    downloadImage(url)
  }

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
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
      
      const resp = await profileApi.uploadAvatar({filePath})
      console.log(resp)

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

  return (
    <Box>
      <Image borderRadius='full' 
      boxSize = '150px'
      src={avatarUrl ? avatarUrl : `https://via.placeholder.com/150`}
      alt={avatarUrl ? 'Avatar' : 'No image'} />
      {uploading ? (
        'Uploading...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            {avatarUrl ? 'Edit your avatar' : 'Upload an avatar'}
          </label>
          <Input width="auto" size="md" type="file" id="single" accept="image/*" onChange={uploadAvatar} disabled={uploading} style={{display: "none"}}/>
        </>
      )}
    </Box>
  )
}

export default Avatar