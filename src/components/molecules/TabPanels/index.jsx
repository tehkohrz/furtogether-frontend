import React from 'react';
import { TabPanel } from '../../atoms'
import { TabPanels as TabPanelsChakra } from '@chakra-ui/react'


function TabPanels({contentArray}) {

  return(
    <>
    <TabPanelsChakra> 
      {contentArray.map((text, index)=> (
        <TabPanel key={index} text={text}/>
      ))}
    </TabPanelsChakra>
    </>
  )
}

export default TabPanels