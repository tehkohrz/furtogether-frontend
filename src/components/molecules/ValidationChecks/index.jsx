import React from 'react'
import { ImageSize } from '../../atoms'
import tick from '../../../assets/formCheck/checked.png'
import cross from '../../../assets/formCheck/remove.png'
import { HStack } from '@chakra-ui/react' 

const ValidationCheck = ({pass, checkWords}) => {

  return (
    <>
    <HStack>
    {pass ? <ImageSize imageSrc={tick} imageAlt="Pass" height="15px" width="15px"/> : <ImageSize imageSrc={cross} imageAlt="Fail" height="15px" width="15px"/>}
    <span> {checkWords} </span>
    </HStack>
    </>
  )
}

export default ValidationCheck