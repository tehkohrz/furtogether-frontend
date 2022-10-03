import React from 'react';
import { TabPanel as TabPanelChakra } from '@chakra-ui/react'

function TabPanel({text}) {


  return(
    <>
    <TabPanelChakra> {text} </TabPanelChakra>
    </>
  )
}

export default TabPanel