import React, {useState} from 'react'
import { TabsComponent } from '../../organisms'
import { Profile } from '../'

const ProfileTab = () => {
  
  // Add pages here
  const object = [
    {
      tab: "Profile",
      page: <Profile/>
    },
    {
      tab: "Photos",
      page: "Page for Multer upload and photos"
    }
  ]

  const arrayTab = []
  const pageTab = []

  const convertObjectToString=(object) => {

    object.map((content)=> {
      console.log(content)
      arrayTab.push(content.tab)
      pageTab.push(content.page)
    })
  }

  convertObjectToString(object)

  return (
    <>
    <TabsComponent tab={arrayTab} tabContent={pageTab}/>
    </>
  )
}

export default ProfileTab