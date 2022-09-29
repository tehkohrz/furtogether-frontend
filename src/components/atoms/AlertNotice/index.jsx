import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const AlertNotice = ({status}) => {

  return (
    <>
    <Alert status={status}>
      <AlertIcon/>
      
    </Alert>
    </>
  )
}

export default AlertNotice