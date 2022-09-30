import React from 'react';
import { Radio } from '@chakra-ui/react'

const RadioButton = ({name, value, text, color, size, isDisabled}) => {

  return (
    <>
    {isDisabled ? <Radio name={name} value={value} colorScheme={color} size={size} isDisabled>{text}</Radio> : 
    <Radio name={name} value={value} colorScheme={color} size={size} >{text}</Radio> }
    </>
  )
}

export default RadioButton