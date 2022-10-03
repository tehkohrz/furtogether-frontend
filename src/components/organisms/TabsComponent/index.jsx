import React from 'react'
import { TabList, TabPanels } from '../../molecules'
import { Tabs as TabsChakra } from '@chakra-ui/react'


const Tabs = ({tab, tabContent}) => {
  
  // example
  // const tab = [1,2,3]
  // const tabContent = ['hehe','lol','rekt']

  return (
    <>
      <TabsChakra>
        <TabList tabArray={tab}></TabList>
        <TabPanels contentArray={tabContent} />
      </TabsChakra>
    </>
  )
}

export default Tabs