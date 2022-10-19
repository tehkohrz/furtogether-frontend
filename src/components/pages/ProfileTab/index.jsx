import React, {useState} from 'react'
import { TabsComponent } from '../../organisms'
import { Profile, PhotoAlbum } from '../'
import { photoAlbumAPI } from '../../../api/photoalbum-api'
import { AvatarProvider } from '../../../contexts/navbar-context'

const ProfileTab = () => {
  const [dogList, setDogList] = useState([])

  const handleTabsChange = async (index) => {
    
    // Added a comment 
    if (object[index]['tab'] == 'Photos') {
      console.log('tab1')

      const response = await photoAlbumAPI.retrieveDogAlbum()
      const dogList = response['data']['dogList']
      setDogList(dogList)
    }
  }

  // Add pages here
  const object = [
    {
      tab: "Profile",
      page: <Profile/>,
    },
    {
      tab: "Photos",
      page: <PhotoAlbum data={dogList}/>,
    }
  ]

  const arrayTab = []
  const pageTab = []

  const convertObjectToString=(object) => {

    object.map((content)=> {
      // console.log(content)
      arrayTab.push(content.tab)
      pageTab.push(content.page)
    })
  }

  convertObjectToString(object)

  return (
    <>
    <AvatarProvider>
    <TabsComponent tab={arrayTab} tabContent={pageTab} handleChange={handleTabsChange}/>
    </AvatarProvider>
    </>
  )
}

export default ProfileTab