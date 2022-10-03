import React from 'react';
import { Tab } from '../../atoms'
import { TabList as TabListChakra } from '@chakra-ui/react'


function TabList({tabArray}) {

  return(
    <>
    <TabListChakra> 
      {tabArray.map((text, index)=> (
        <Tab key={index} text={text}/>
      ))}
    </TabListChakra>
    </>
  )
}

export default TabList