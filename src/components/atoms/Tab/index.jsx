import React from 'react';
import { Tab as TabChakra } from '@chakra-ui/react'

function Tab({text, fontColorSelected,bgColorSelected}) {


  return(
    <>
    <TabChakra _selected={{ color: {fontColorSelected}, bg: {bgColorSelected}} }> {text} </TabChakra>
    </>
  )
}

export default Tab