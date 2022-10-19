import { ThemeContext } from '@emotion/react'
import React, { useContext, useState, useEffect } from 'react'
import { profileApi } from '../api/profile-api'
import { supabase } from '../services/supabaseClient'

// Need to export const
export const AvatarContext = React.createContext({})

// Export function
export function AvatarProvider({children}) {
  const [avatarUrl, setAvatarUrl] = useState(null)

  const retrieveAvatar = async () => {
    const profileRetrieve = await profileApi.retrieveAvatar();
    const avatar = profileRetrieve['data']['avatar_url'];
    // setAvatarUrl(avatar)
    // setToggleDownload(!toggleDownload)
    downloadImage(avatar)
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

  return(
    <AvatarContext.Provider value={{avatarUrl, retrieveAvatar}}>
      {children}
    </AvatarContext.Provider>
  )
}